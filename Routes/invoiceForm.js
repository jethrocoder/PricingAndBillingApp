route=require('express').Router()
const {pricing_and_codification_chart}=require('../database/db')

route.get('/invoiceForm',(req,res)=>{
    res.render('invoiceForm')
})

route.post('/invoiceForm/generateInvoice',async (req,res)=>{
    let {specific_codes,quantities,add_info}=req.body
    let table=[]
    let x,y,z,subtotal,cgst,sgst,igst,total,grand_total
    x=y=z=subtotal=cgst=sgst=igst=total=grand_total=0
    for(let index in specific_codes){
        let specific_code=specific_codes[index]
        let quantity=quantities[index]
        let row=await pricing_and_codification_chart.findOne({where:{specific_code:specific_code}})
        .catch((err)=>{console.error(err)})
        let name_of_item=row.name_of_item
        let hsn_code=row.hsn_code
        let basic_sale_price=row.basic_sale_price
        let discount_percent=row.discount_percent
        let discount_price=row.discount_price
        let gst_percent=row.gst_percent
        let p_and_f_charges=row.p_and_f_charges
        let total_p_and_f_charges=p_and_f_charges*quantity
        let value_of_sale=discount_price*quantity
        let gst_charges=parseInt(((value_of_sale*gst_percent))/100)

        let invoice_row={
            name_of_item,
            specific_code,
            quantity,
            hsn_code,
            basic_sale_price,
            discount_percent,
            discount_price,
            value_of_sale,
            gst_percent,
            gst_charges,
            p_and_f_charges,
            total_p_and_f_charges
        }
        table.push(invoice_row)
        x+=value_of_sale
        y+=gst_charges
        z+=total_p_and_f_charges
    }
    if(add_info.state=='Delhi'){
        cgst=0.5*y
        sgst=0.5*y
    }else{
        igst=y
    }
    subtotal=x+y+z
    total=subtotal+cgst+sgst+igst
    grand_total=total+z

    let tax_and_total={
        x,y,z,subtotal,cgst,sgst,igst,total,grand_total,
    }
    console.log({table,tax_and_total,add_info})
    res.send({table,tax_and_total,add_info})
})


module.exports={
    invoiceRoute:route
}
