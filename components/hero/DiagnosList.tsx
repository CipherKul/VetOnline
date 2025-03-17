import { ChevronRight } from "lucide-react"
import Image from "next/image"

const diagnosLinks = [
	{
		title: "Fästing",
		link: "/formular?q=fasting&redirectPath=/checkout/",
		icon: "/icons/animals/dog.svg",
		alt: "dog"
	},
	{
		title: "Avmaskning",
		link: "/formular?q=avmaskning&redirectPath=/checkout/",
		icon: "/icons/animals/cat.svg",
		alt: "cat"
	},
]


export const DiagnosList: React.FC = () => {
	return (
		<div className="flex flex-col font-[Inter-Medium] text-rogray-700">
			{
				diagnosLinks.map((d, key) => {
					return <div key={key} className="flex flex-row items-center justify-center">
						<Image alt={d.alt} src={d.icon} width="35" height="31" className="col-span-1  w-[35px]" />
						<span className="col-span-5  grow items-center justify-center">{d.title}</span>
						<ChevronRight />
					</div>
				})
			}
		</div>
	)
}
