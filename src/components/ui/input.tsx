import { tm } from '@/utils/twmerge'
import * as React from 'react'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	startAdornment?: JSX.Element
	endAdornment?: JSX.Element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, startAdornment, endAdornment, ...props }, ref) => {
		const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment)
		return (
			<>
				{hasAdornment ? (
					<div
						className="flex items-center justify-center gap-2 px-3 h-10 rounded-md border border-input bg-transparent ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
						data-disabled={props.disabled}
					>
						{startAdornment && (
							<div className={tm('text-muted-foreground')}>
								{startAdornment}
							</div>
						)}
						<input
							type={type}
							className={tm(
								'flex h-full w-[88%] rounded-md bg-transparent py-2 text-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground shadow-none outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none',
								className,
							)}
							ref={ref}
							{...props}
						/>
						{endAdornment && (
							<div className={tm('text-muted-foreground')}>{endAdornment}</div>
						)}
					</div>
				) : (
					<input
						type={type}
						className={tm(
							'flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
							className,
						)}
						ref={ref}
						{...props}
					/>
				)}
			</>
		)
	},
)
Input.displayName = 'Input'

export { Input }
