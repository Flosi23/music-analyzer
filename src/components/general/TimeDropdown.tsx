import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface TimeDropdownProps {
	changeTime: (s: string) => void;
}

export default function TimeDropdown({ changeTime }: TimeDropdownProps) {
	return (
		<Menu as="div" className="relative inline-block text-left ">
			<div>
				<Menu.Button className="base-button flex justify-center items-center">
					Time Range
					<ChevronDownIcon
						className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items
					className={
						"absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-accent-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					}>
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active
											? "bg-accent-500 text-white"
											: "text-gray-900"
									} group flex w-full items-center rounded-md px-2 py-2 text-md`}
									onClick={() => changeTime("short_term")}>
									Short Term
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active
											? "bg-accent-500 text-white"
											: "text-gray-900"
									} group flex w-full items-center rounded-md px-2 py-2 text-md`}
									onClick={() => changeTime("medium_term")}>
									Medium Term
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active
											? "bg-accent-500 text-white"
											: "text-gray-900"
									} group flex w-full items-center rounded-md px-2 py-2 text-md`}
									onClick={() => changeTime("long_term")}>
									Long Term
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
