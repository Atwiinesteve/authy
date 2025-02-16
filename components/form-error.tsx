import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
	message?: string;
}

export default function FormErrorMessage({ message }: FormErrorProps) {
	if (!message) return null;
	return (
		<div>
			<div className="bg-destructive/15 text-sm text-destructive p-3 rounded-md flex items-center gap-x-2">
				<FaExclamationTriangle className="h-4 w-4" />
				<p>{message}</p>
			</div>
		</div>
	);
}
