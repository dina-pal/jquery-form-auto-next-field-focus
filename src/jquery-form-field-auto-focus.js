; (function($){
    if(typeof jQuery !== 'undefined'){
        const forms = jQuery('form');
        let inputType = ['INPUT', 'SELECT', 'TEXTAREA'];
        forms.each(function(formIndex, fElement){
            // Add a id to that form
            let fIndexOne = (formIndex + 2)
            fIndex =  parseInt(fIndexOne + ('00')) ;
            let formId = $(this).attr('id', 'savior-form-id-' + fIndex);
            let currentActive = '';
            // get form childrain
            $(this).children().each(function(eIndex){
                $(this).addClass('form-index-' + (fIndex+eIndex));
                $(this).find('input, select, textarea').attr('data-id', (fIndex+eIndex)).addClass('field-id-' + (fIndex+eIndex));
                if(inputType.includes($(this).prop('tagName'))){
                    $(this).attr('data-id', (fIndex+eIndex)).addClass('field-id-' + (fIndex+eIndex));
                }
            })
            $('body').on('click blur tap touch', function(event){
                if (inputType.includes(event.target.nodeName)){
                    $('*').removeClass('current_form');
                    currentActive = parseInt($(event.target).attr('data-id'));
                    $(event.target).eq(0).addClass('active_field').trigger('focus')
                    $(event.target).parent().addClass('activeFocus').parent('form').addClass('current_form')
                }else {
                    if(currentActive !== ''){
                        if($(`[data-id=${currentActive}]`).val() !== '' && $(`[data-id=${currentActive}]`).val() !== undefined){
                            $("*").removeClass('active_field')
                            let nextId = currentActive+1;
                            $(`.form-index-${currentActive}`).removeClass('activeFocus')
                            $(`.form-index-${nextId}`).addClass('activeFocus');
                            let nextElement = $('.activeFocus').find(`[data-id=${nextId}]`).eq(0).addClass('active_field')
                             nextElement.focus(); 
                            if($(`[data-id=${nextId}]`).prop('tagName') === 'SELECT'){
                                let currentSelect = $(`[data-id=${nextId}]`);
                                currentSelect.attr("size", currentSelect.find("option").length);
                            }else{
                                $('select').attr('size', 0)
                            }
                             currentActive +=1;
                        }else{
                           $(`[data-id=${currentActive}]`).focus();
                        }  
                        
                    }
                }
            })

        })
    }
})(jQuery)