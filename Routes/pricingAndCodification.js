route=require('express').Router()
const {pricing_and_codification_chart}=require('../database/db')

route.get('/pricingAndCodificationChart', async (req,res)=>{
    await pricing_and_codification_chart.findAll()
    .then((data)=>{
        res.render('pricingAndCodification',{data})
    })  
    .catch((err)=>{
        console.error(err)
    })
})

route.post('/pricingAndCodificationChart/post', async (req,res)=>{
    let { supplier_info,
        name_of_item,
        hsn_code,
        purchase_rate,
        gst_percent,
        specific_code,
        cost_multiply_factor,
        p_and_f_charges ,
        gst_quotient,
        discount_percent,
        previous_stock,
        current_supply,
        quantity_sold,
        net_stock_balance}
        =req.body
    hsn_code=parseInt(hsn_code)
    purchase_rate=parseInt(purchase_rate)
    gst_percent=parseInt(gst_percent)
    cost_multiply_factor=parseInt(cost_multiply_factor)
    p_and_f_charges=parseInt(p_and_f_charges)
    gst_quotient=parseInt(gst_quotient)
    previous_stock=parseInt(previous_stock)
    current_supply=parseInt(current_supply)
    quantity_sold=parseInt(quantity_sold)
    net_stock_balance=parseInt(net_stock_balance)

    if(isNaN(hsn_code) || isNaN(purchase_rate) ||isNaN(cost_multiply_factor) ||
    isNaN(p_and_f_charges) || isNaN(gst_quotient) || isNaN(previous_stock) ||
    isNaN(current_supply) || isNaN(quantity_sold) ||isNaN(net_stock_balance)
    ||isNaN(gst_percent)){
        return res.send({data_format_incorrect:true})
     }

    let addon_charge,purchase_cost,tentative_sale_price,gst_per_unit;
    let discount_price,basic_sale_price,total_sale_price,current_stock;

    addon_charge=parseInt((purchase_rate*(gst_percent+5))/100)
    purchase_cost=parseInt(purchase_rate+addon_charge)
    tentative_sale_price=parseInt(purchase_cost*cost_multiply_factor)
    gst_per_unit=parseInt((gst_quotient*(tentative_sale_price-p_and_f_charges))/(1+gst_quotient))
    discount_price=parseInt(tentative_sale_price-p_and_f_charges-gst_per_unit)
    basic_sale_price=parseInt(discount_price/(100-discount_percent))
    total_sale_price=parseInt(basic_sale_price*(1+gst_quotient)+p_and_f_charges)
    current_stock=parseInt(previous_stock+current_supply)

    await pricing_and_codification_chart.create({
        supplier_info:supplier_info,
        name_of_item:name_of_item,
        hsn_code:hsn_code,
        purchase_rate:purchase_rate,
        gst_percent:gst_percent,
        addon_charge:addon_charge,
        purchase_cost:purchase_cost,
        specific_code:specific_code,
        cost_multiply_factor:cost_multiply_factor,
        tentative_sale_price:tentative_sale_price,
        p_and_f_charges:p_and_f_charges ,
        gst_quotient:gst_quotient,
        gst_per_unit:gst_per_unit,
        discount_price:discount_price,
        discount_percent:discount_percent,
        basic_sale_price:basic_sale_price,
        total_sale_price:total_sale_price,
        previous_stock:previous_stock,
        current_supply:current_supply,
        current_stock:current_stock,
        quantity_sold:quantity_sold,
        net_stock_balance:net_stock_balance
    })
    .then((data)=>{
        res.status(201).send(data)
    })  
    .catch((err)=>{
        console.error(err)
    })
})

route.get('/pricingAndCodificationChart/delete/:specific_code', async (req,res)=>{

    let specific_code=req.params.specific_code
    await pricing_and_codification_chart.findOne({where:{specific_code:specific_code}})
    .then(async (data)=>{
        await data.destroy()
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.error(err)
        })
    })  
    .catch((err)=>{
        console.error(err)
    })
})

module.exports={
    pricingAndCodificationRoute:route
}
