    function renderInvoice(data){
      $('.invoiceForm').html('')
    const {table,tax_and_total,add_info}= data

      let table_body='';
    for(let row of table){
      table_body+=
      `
    <tr>
    <th scope="row">#</th>
    <td>${row.name_of_item}</td>
    <td>${row.specific_code}</td>
    <td>${row.quantity}</td>
    <td>${row.hsn_code}</td>
    <td>${row.basic_sale_price}</td>
    <td>${row.discount_percent}</td>
    <td>${row.discount_price}</td>
    <td>${row.value_of_sale}</td>
    <td>${row.gst_percent}</td>
    <td>${row.gst_charges}</td>
    <td>${row.p_and_f_charges}</td>
    <td>${row.total_p_and_f_charges}</td>
  </tr>
  `
  }

let invoice= `
<link href="invoice.css" rel="stylesheet">
<script src="invoice.js"></script>
<div class="container">
    <div class="row invoice-header px-3 py-2">
        <h3 class="text-center col-12">CASH/TAX INVOICE</h3>
        <div class="col-4 text-left">
            GST IN: 07AADPZ8852AIZH
        </div>
        <div class="col-8">
            <p class="text-left" id="company_name">INDO GLOBAL ENTERPRISES</p>
            <p class="text-left ml-1">574/7, Zakir Nagar, Okhla, New Delhi-110025</p>
        </div>
    </div>
  
    <div class="invoice-content row px-5 pt-5">
      <div class="col-3">
        <h5 class="almost-gray mb-3">Invoice No:</h5>
        <h5 class="almost-gray mb-3">Billed To:</h5>
        <p class="gray-ish">${add_info.billed_to}</p>
        <p class="gray-ish">GST IN:${add_info.billed_to_gst}</p>
      </div>
      <div class="col-5 text-center">
        <h5 class="almost-gray">Date of Issue:</h5>
        <p class="gray-ish">${add_info.date}</p>
  
      </div>
      <div class="col-4 text-left total-field">
        <h5 class="almost-gray">Place of supply:</h5>
        <h5 class="almost-gray">Supplied To:</h5>
        <p class="gray-ish">${add_info.supplied_to}</p>
        <p class="gray-ish">GST IN:${add_info.supplied_to_gst}</p>
      </div>
    </div>
  
    <div class="row mt-5">
      <div class="col-10 pt-1">
        <table class="table">
              <thead class="">
                <tr>
                  <th scope="col gray-ish">Sr. No.</th>
                  <th scope="col gray-ish">Name of Item</th>
                  <th scope="col gray-ish">Specific Code</th>
                  <th scope="col gray-ish">Quantity Unit</th>
                  <th scope="col gray-ish">HSN Code</th>
                  <th scope="col gray-ish">Basic Sale Price</th>
                  <th scope="col gray-ish">Discount %age</th>
                  <th scope="col gray-ish">Discounted Sale Price</th>
                  <th scope="col gray-ish">Value Of Sale</th>
                  <th scope="col gray-ish">GST %age</th>
                  <th scope="col gray-ish">GST Charges</th>
                  <th scope="col gray-ish">Pkg & Forwd Charges Per Unit</th>
                  <th scope="col gray-ish">Pkg & Forwd Charges</th>
                </tr>
              </thead>
              <tbody>
                  `
                  +        

                table_body

                  +

                  `
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Rs.${tax_and_total.x}</td>
                    <td></td>
                    <td>Rs.${tax_and_total.y}</td>
                    <td></td>
                    <td>Rs.${tax_and_total.z}</td>
                  </tr>
                </tbody>
            </table>
      </div>
    </div>
  <div class="row invoice_details">
     <!-- invoiced to details -->
     <div class="col-4 offset-1 pt-3">
       <h4 class="gray-ish">Terms & Conditions</h4>
       <p class="pt-3 almost-gray text-justify">1 - Goods are subject to replacement for any manufacturing defect within one week of receipt of materials by customer but not for elsewhere</p>
       <p class="pt-3 almost-gray text-justify">2 - All disputes are subject to settlement at Delhi State Jurisdiction only</p>

    </div>
     <!-- Invoice assets and total -->
          <div class="offset-1 col-5 mb-3 pr-4 sub-table">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row gray-ish">Subtotal</th>
                  <td class="text-right">Rs.${tax_and_total.subtotal}</td>
                </tr>
                <tr>
                  <th scope="row gray-ish">CGST</th>
                  <td class="text-right">Rs.${tax_and_total.cgst} </td>
                </tr>
                <tr>
                  <th scope="row gray-ish">SGST</th>
                  <td class="text-right">Rs.${tax_and_total.sgst}</td>
                </tr>
                <tr>
                  <th scope="row gray-ish">IGST</th>
                  <td class="text-right">Rs.${tax_and_total.igst}</td>
                </tr>
                  <tr>
                    <th scope="row gray-ish">Total</th>
                    <td class="text-right">Rs.${tax_and_total.total}</td>
                  </tr>
                  <tr>
                    <th scope="row gray-ish">Pkg. & frwd charges</th>
                    <td class="text-right">Rs.${tax_and_total.z}</td>
                  </tr>
                <tr>
                    <th scope="row gray-ish"><h4>Grand Total</h4></th>
                    <td class="text-right"><h4>${tax_and_total.grand_total}</h4></td>
                </tr>
              </tbody>
            </table>
          </div>
     </div>
    <p class="text-center pb-3"><em> Taxes will be calculated in &euro; regarding transport and other taxable services.</em></p>
  </div>

`
return invoice
    }
