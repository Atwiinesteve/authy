import { CiCircleCheck } from "react-icons/ci";

interface FormErrorProps {
	message?: string;
}

export default function FormSuccessMessage({ message }: FormErrorProps) {
	if (!message) return null;
	return (
		<div>
			<div className="bg-green-200/50 text-sm text-green-700 p-3 rounded-md flex items-center gap-x-2">
				<CiCircleCheck className="h-4 w-4" />
				<p>{message}</p>
			</div>
		</div>
	);
}
