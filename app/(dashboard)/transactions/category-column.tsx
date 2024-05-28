import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
type Props = {
    id: string,
    category: string | null,
    categoryId: string | null,
}

export const CategoryColumn = ({
    category,
    categoryId
}: Props) => {
    const { onOpen } = useOpenCategory();
    const onClick = () => {
        if (categoryId) {
            onOpen(categoryId);
        }
    }
    return (
        <div
            onClick={onClick}
            className={cn("flex items-center cursor-pointer hover:underline",
                !category && "text-rose-500",
            )}
        >
            {!category && <AlertTriangle className="mr-2 size-4 shrink-0" />}
            {category || "Uncategorized"}
        </div>
    )
}