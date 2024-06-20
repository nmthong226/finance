"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const buttonVariant = cva(
    "lg:w-auto w-full h-9 rounded-md px-3 font-normal border-none focus:ring-offset-0 focus:ring-transparent outline-none transition",
    {
        variants: {
            variant: {
                default: "bg-white/10 hover:bg-white/20 hover:text-white text-white focus:bg-white/30",
                light: "bg-white/10 hover:bg-white/20 hover:text-white text-white focus:bg-white/30",
                dark: "bg-black/10 hover:bg-black/20 hover:text-black text-black focus:bg-black/30"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

type ButtonVariant = VariantProps<typeof buttonVariant>

interface ButtonProps extends ButtonVariant {}

export const CountryButton = (variant: ButtonProps) => {
    const router = useRouter();
    const localActive = useLocale();
    const path = usePathname();
    const onSelectChange = () => {
        if (localActive === "vn") {
            const newPathname = path.replace(/\/(en|vn)\//, `/en/`);
            router.replace(newPathname);
        } else {
            const newPathname = path.replace(/\/(en|vn)\//, `/vn/`);
            router.replace(newPathname);
        }
    }
    return (
        <Select
            value={localActive}
            onValueChange={onSelectChange}
            disabled={false}
        >
            <SelectTrigger
                className={cn(buttonVariant(variant))}
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