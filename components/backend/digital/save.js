<table className="table table-bordered">
<thead>
<tr className="header-table d-flex">
<th >Màu sắc</th>
<th >Size</th>
<th >Giá</th>
<th >Kho hàng</th>
<th >SKU phân loại</th>
</tr>
</thead>
<tbody className="border-row variants">
<th>
{variantList.map((x, i) => {
return (
<>
<td>{x.variantValue}</td>
                </>
                )
            })}
        {/* {attributeList.map((x, i) => {
            return (
                <>

                        {x.attributeValue}

                    </>
            )
        })} */}
</th>
</tbody>
{/* {arrayWithData.map(item => {
        return (
            <tr key={item.password}>
                <td>{ item.firstname }</td>
                <td>{ item.lastname }</td>
                <td>{ item.password }</td>
                <td>{ item.email }</td>
            </tr>
        );
    })} */}
</table>