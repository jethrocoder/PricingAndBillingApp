const Sequelize= require('sequelize')

const db=new Sequelize({
    host:'localhost',
    username:'zahoorAnwar',
    password:'zaidi7412bijnor',
    dialect:'mysql',
    database:'pricing'
})

const invoice_chart=db.define('invoice_chart',{
    sr_no:Sequelize.DataTypes.INTEGER,
    name_of_item:Sequelize.DataTypes.STRING,
    specific_code:Sequelize.DataTypes.STRING,
    quantity:Sequelize.DataTypes.INTEGER,
    hsn_code:Sequelize.DataTypes.INTEGER,
    basic_sale_price:Sequelize.DataTypes.INTEGER,
    discount_percent:Sequelize.DataTypes.INTEGER,
    discount_sale_price:Sequelize.DataTypes.INTEGER,
    value_of_sale:Sequelize.DataTypes.INTEGER,
    gst_percent:Sequelize.DataTypes.INTEGER,
    gst_charge:Sequelize.DataTypes.INTEGER,
    pkg_and_forwd_charges_per_unit:Sequelize.DataTypes.INTEGER,
    pkg_and_forwd_charges:Sequelize.DataTypes.INTEGER,

})

const pricing_and_codification_chart=db.define('pricing_and_codification_chart',{
    supplier_info:Sequelize.DataTypes.STRING,
    name_of_item:Sequelize.DataTypes.STRING,
    hsn_code:Sequelize.DataTypes.INTEGER,
    purchase_rate:Sequelize.DataTypes.INTEGER,
    gst_percent:Sequelize.DataTypes.INTEGER,
    addon_charge:Sequelize.DataTypes.INTEGER,
    purchase_cost:Sequelize.DataTypes.INTEGER,
    specific_code:Sequelize.DataTypes.STRING,
    cost_multiply_factor:Sequelize.DataTypes.FLOAT,
    tentative_sale_price:Sequelize.DataTypes.INTEGER,
    p_and_f_charges: Sequelize.DataTypes.INTEGER,
    gst_quotient:Sequelize.DataTypes.FLOAT,
    gst_per_unit:Sequelize.DataTypes.INTEGER,
    discount_price:Sequelize.DataTypes.INTEGER,
    discount_percent:Sequelize.DataTypes.INTEGER,
    basic_sale_price:Sequelize.DataTypes.INTEGER,
    total_sale_price:Sequelize.DataTypes.INTEGER,
    previous_stock:Sequelize.DataTypes.INTEGER,
    current_supply:Sequelize.DataTypes.INTEGER,
    current_stock:Sequelize.DataTypes.INTEGER,
    quantity_sold:Sequelize.DataTypes.INTEGER,
    net_stock_balance:Sequelize.DataTypes.INTEGER
})

module.exports={
    pricing_and_codification_chart,invoice_chart,db
}