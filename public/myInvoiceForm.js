$(()=>{
    const addBtn=$('#addBtn')
    const sendBtn=$('#send-button')

    let specific_codes=[]
    let quantities=[]
    let invoice_table=$('#invoice_table')

    
    $('#specific_code').on('input',()=>{
        addBtn.prop("disabled",$('#specific_code').val()=='' || $('#quantity').val()=='')
    })

    $('#quantity').on('input',()=>{
        addBtn.prop("disabled",$('#specific_code').val()=='' || $('#quantity').val()=='')
        
    })

    addBtn.click(()=>{
        let specific_code=$('#specific_code').val()
        let quantity=$('#quantity').val()
        specific_codes.push(specific_code)
        quantities.push(quantity)
        let new_row=$(`<tr><td>${specific_code}</td><td>${quantity}</td></tr>`)
        let delBtn=$(`<button type="button" class="btn btn-danger m-1 ml-2" >Delete</button>`)
        new_row.append(delBtn)
        delBtn.click(()=>{
            let ind=-1
            for(let i in specific_codes){
                if(specific_codes[i]==new_row.children()[0].textContent && 
                quantities[i]==new_row.children()[1].textContent){
                    ind=i
                    break
                }
            }
         
            specific_codes.splice(ind,1)
            quantities.splice(ind,1)
            new_row.remove()
        })
       
        invoice_table.prepend(new_row)
        $('#specific_code').val("")
        $('#quantity').val("")
        
    })

   

    sendBtn.click(()=>{
        const date=$('#date').val();
        const billed_to=$('#billed_to').val();
        const billed_to_gst=$('#billed_to_gst').val();
        const supplied_to=$('#supplied_to').val();
        const supplied_to_gst=$('#supplied_to_gst').val();
        const state=$('#state').val()
    
        const add_info={
            date,billed_to,billed_to_gst,supplied_to,supplied_to_gst,state
        }

        let incomplete=false
        for(ind in add_info){
            if(add_info[ind]=='') { incomplete=true }
        }
        incomplete=$('#invoice_table').children().length<=1?true:false
        if(incomplete){
            window.alert('Data insufficient')
            return
        }

        $.post('/api/invoiceForm/generateInvoice',{specific_codes,quantities,add_info},(data)=>{
            if(data.invalid_specific_code==true){
                alert('Invalid specific code')
                return;
            }
            $('#result').append(renderInvoice(data))
        })
    })



})