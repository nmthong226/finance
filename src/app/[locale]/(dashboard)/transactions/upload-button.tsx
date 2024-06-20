import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
    onUpload: (results: any) => void;
}

export const UploadButton = ({ onUpload }: Props) => {
    const t = useTranslations('TransactionHistory');
    const { CSVReader } = useCSVReader();
    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({getRootProps}: any) => (
                <Button
                    size={"sm"}
                    className="w-full md:w-auto"
                    {...getRootProps()}
                >
                    <Upload className="size-4 mr-2"/>
                    {t('import-button')}
                </Button>
            )}
        </CSVReader>
    );
}