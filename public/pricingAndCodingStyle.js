$(()=>{
    let addBtn=$('#addBtn')
    
    let supplier_info=$('#supplier_info')
    let name_of_item=$('#name_of_item')
    let hsn_code=$('#hsn_code')
    let gst_percent=$('#gst_percent')
    let specific_code=$('#specific_code')
    let purchase_rate=$('#purchase_rate')
    let cost_multiply_factor=$('#cost_multiply_factor')
    let p_and_f_charges=$('#p_and_f_charges')
    let gst_quotient=$('#gst_quotient')
    let discount_percent=$('#discount_percent')
    let previous_stock=$('#previous_stock')
    let current_supply=$('#current_supply')
    let quantity_sold=$('#quantity_sold')
    let net_stock_balance=$('#net_stock_balance')
    addBtn.click(()=>{
            $.post('/api/pricingAndCodificationChart/post',{
            supplier_info:supplier_info.val(),
            name_of_item:name_of_item.val(),
            hsn_code:hsn_code.val(),
            gst_percent:gst_percent.val(),
            specific_code:specific_code.val(),
            cost_multiply_factor:cost_multiply_factor.val(),
            p_and_f_charges:p_and_f_charges.val(),
            gst_quotient:gst_quotient.val(),
            discount_percent:discount_percent.val(),
            previous_stock:previous_stock.val(),
            current_supply:current_supply.val(),
            quantity_sold:quantity_sold.val(),
            net_stock_balance:net_stock_balance.val(),
            purchase_rate:purchase_rate.val()
        },(data)=>{
            supplier_info.val("")
            name_of_item.val("")
            hsn_code.val("")
            gst_percent.val("")
            specific_code.val("")
            cost_multiply_factor.val("")
            p_and_f_charges.val("")
            gst_quotient.val("")
            discount_percent.val("")
            previous_stock.val("")
            current_supply.val("")
            quantity_sold.val("")
            net_stock_balance.val("")
            purchase_rate.val("")
            
            let data_body=$('#data_body')
            let delBtn= $(` <td class="noprint"><button type="button"  class="btn btn-danger myBtn">Delete</button></td>`)
            delBtn.click(()=>{
                console.log('clicked')
                $.get(`/api/pricingAndCodificationChart/delete/${data.specific_code}`,()=>{
                    new_row.remove()
                })
            })

            let new_row=$(`<tr><td>${data.supplier_info}</td><td>${data.name_of_item}</td><td>${data.hsn_code}</td><td>${data.purchase_rate}</td><td>${data.gst_percent}</td><td>${data.addon_charge}</td><td>${data.purchase_cost}</td><td>${data.specific_code}</td><td>${data.cost_multiply_factor}</td><td>${data.tentative_sale_price}</td><td>${data.p_and_f_charges}</td><td>${data.gst_quotient}</td><td>${data.gst_per_unit}</td><td>${data.discount_price}</td><td>${data.discount_percent}</td><td>${data.basic_sale_price}</td><td>${data.total_sale_price}</td><td>${data.previous_stock}</td><td>${data.current_supply}</td><td>${data.current_stock}</td><td>${data.quantity_sold}</td><td>${data.net_stock_balance}</td>
            </tr>`)
            new_row.append(delBtn)

            data_body.append(new_row)
                 
             
  
        })
    })

   


})
















//  let data_body=$('#data_body') 
// data_body.append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>') 