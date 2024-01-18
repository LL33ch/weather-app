import Link from "next/link"
import { Button } from './ui/button'

export default function Navigation() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className='container px-2 flex h-14 items-center'>
				<Link href={'/'}><Button variant="ghost">Weather App</Button></Link>
			</div>
		</nav>
	)
}