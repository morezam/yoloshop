interface TableProps extends React.ComponentPropsWithRef<'table'> {
	headers: string[];
	children: React.ReactNode;
}

interface TdProps extends React.ComponentPropsWithRef<'td'> {
	children: React.ReactNode;
	btn?: boolean;
	styling?: string;
}

interface ThProps extends React.ComponentPropsWithRef<'th'> {
	children: React.ReactNode;
	styling?: string;
}

export const Td = (props: TdProps) => {
	return (
		<td
			className={`border-b-2 py-2 border-b-slate-200 px-3  text-center ${
				props.btn && props.btn
					? 'cursor-pointer hover:bg-gray-200 whitespace-nowrap'
					: null
			} ${props.styling}`}
			{...props}>
			{props.children}
		</td>
	);
};

export const Th = (props: ThProps) => {
	return (
		<th
			className={`sticky top-0 border-b-2 whitespace-nowrap py-2 border-b-slate-200 px-3 text-center ${props.styling}`}
			{...props}>
			{props.children}
		</th>
	);
};

const TableLayout = (props: TableProps) => {
	return (
		<div className="overflow-auto sm:flex justify-center">
			<table className="table-fixed relative">
				<thead>
					<tr>
						{props.headers.map(item => (
							<Th key={item}>{item}</Th>
						))}
					</tr>
				</thead>

				<tbody>{props.children}</tbody>
			</table>
		</div>
	);
};

export default TableLayout;
