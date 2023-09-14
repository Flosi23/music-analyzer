import TextBody from "@components/text/TextBody";

interface Props {
	rows: { label?: string; value?: string | number }[];
	className?: string;
}

export default function ItemInfoTable({ rows, className }: Props) {
	return (
		<table className={`table-auto w-full ${className}`}>
			<tbody>
				{rows.map(({ label, value }) =>
					value && label ? (
						<ItemInfoTableRow
							key={`${label}${value}`}
							label={label}
							value={value}
						/>
					) : (
						<></>
					),
				)}
			</tbody>
		</table>
	);
}

function ItemInfoTableRow({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<tr>
			<td className="align-top">
				<TextBody size="small" className="mt-1" bold={true}>
					{label}
				</TextBody>
			</td>
			<td>
				<TextBody size="small" className="ml-3 mt-1">
					{value}
				</TextBody>
			</td>
		</tr>
	);
}
