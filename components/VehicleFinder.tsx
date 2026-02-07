'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck } from 'lucide-react'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i)
const MAKES = ['Volvo', 'Kenworth', 'Freightliner', 'Peterbilt', 'Mack', 'International']

// In a real app, models would filter based on Make. 
// For this MVP, we list common models.
const MODELS_BY_MAKE: Record<string, string[]> = {
    'Volvo': ['VNL', 'VNR', 'VNX', 'D13 Engine', 'D11 Engine'],
    'Kenworth': ['T680', 'T880', 'W990', 'W900', 'T800'],
    'Freightliner': ['Cascadia', 'M2 106', 'Coronado', 'DD15 Engine', 'DD13 Engine'],
    'Peterbilt': ['579', '389', '567'],
    'Mack': ['Anthem', 'Pinnacle', 'Granite', 'MP8 Engine'],
    'International': ['LT Series', 'Lonestar', 'ProStar']
}

interface VehicleFinderProps {
    compact?: boolean
    className?: string
}

export function VehicleFinder({ compact = false, className = "" }: VehicleFinderProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize state
    const [make, setMake] = useState<string>(searchParams.get('make') || '')
    const [model, setModel] = useState<string>(searchParams.get('model') || '')
    const [year, setYear] = useState<string>(searchParams.get('year') || '')

    // Sync state with URL params on change (fixes back button and soft nav desync)
    useEffect(() => {
        setMake(searchParams.get('make') || '')
        setModel(searchParams.get('model') || '')
        setYear(searchParams.get('year') || '')
    }, [searchParams])

    const handleSearch = () => {
        // Create new params based on current URL params to preserve other filters (like type)
        const params = new URLSearchParams(searchParams.toString())

        if (make) {
            params.set('make', make)
        } else {
            params.delete('make')
        }

        if (model) {
            params.set('model', model)
        } else {
            params.delete('model')
        }

        if (year) {
            params.set('year', year)
        } else {
            params.delete('year')
        }

        router.push(`/shop?${params.toString()}`)
    }

    const handleReset = () => {
        setMake('')
        setModel('')
        setYear('')
        router.push('/shop')
    }

    const availableModels = make ? (MODELS_BY_MAKE[make] || []) : []

    if (compact) {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="grid grid-cols-2 gap-2">
                    <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent>
                            {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={make} onValueChange={(v) => { setMake(v); setModel(''); }}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Make" /></SelectTrigger>
                        <SelectContent>
                            {MAKES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Select value={model} onValueChange={setModel} disabled={!make}>
                    <SelectTrigger><SelectValue placeholder="Select Model" /></SelectTrigger>
                    <SelectContent>
                        {availableModels.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                </Select>
                <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={handleSearch} disabled={!make}>Filter</Button>
                    {(make || model || year) && <Button size="sm" variant="ghost" onClick={handleReset}>Clear</Button>}
                </div>
            </div>
        )
    }

    return (
        <Card className={`w-full max-w-4xl mx-auto shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm relative z-20 -mt-16 md:-mt-24 ${className}`}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                    <Truck className="h-6 w-6 text-primary" />
                    Select Your Vehicle
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                    {/* Year First */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Year</label>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger>
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {YEARS.map(y => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Make Second */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Make</label>
                        <Select value={make} onValueChange={(v) => { setMake(v); setModel(''); }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Make" />
                            </SelectTrigger>
                            <SelectContent>
                                {MAKES.map(m => (
                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Model Third */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Model</label>
                        <Select value={model} onValueChange={setModel} disabled={!make}>
                            <SelectTrigger>
                                <SelectValue placeholder="Model" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableModels.map(m => (
                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button className="flex-1" onClick={handleSearch} disabled={!make}>
                            Find Parts
                        </Button>
                        {(make || model || year) && (
                            <Button variant="ghost" onClick={handleReset}>Reset</Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
