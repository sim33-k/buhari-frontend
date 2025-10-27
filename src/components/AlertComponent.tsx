import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./ui/alert"

interface AlertComponentProps {
  type: string,
  message: string,
  title: string
}

export function AlertComponent({ type, message, title }: AlertComponentProps) {
  return (
    <Alert 
      variant={type === 'error' ? 'destructive' : 'default'}
      className="fixed top-4 right-4 w-96 z-50 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out"
    >
      {type === 'success' ? (
        <CheckCircle2Icon className="h-4 w-4" />
      ) : (
        <AlertCircleIcon className="h-4 w-4" />
      )}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

