"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

export const CountryButton = () => {

    return (
        <Select
            value={"vn"}
            onValueChange={() => { }}
            disabled={false}
        >
            <SelectTrigger
                className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">
                    <span className="fi fi-us fis mr-2"></span>
                    English
                </SelectItem>
                <SelectItem value="vn">
                    <span className="fi fi-vn fis mr-2"></span>
                    Tiếng Việt
                </SelectItem>
            </SelectContent>
        </Select>
    )
}