; (function ($) {
    if (typeof jQuery !== 'undefined') {
        const forms = jQuery('form');
        let inputType = ['INPUT', 'SELECT', 'TEXTAREA'];
        let fieldType = ['color', 'checkbox', 'radio', 'date', 'datetime-local', 'email', 'file', 'image', 'month', 'number', 'password', 'range', 'reset', 'tel', 'text', 'time', 'url', 'week'];

        forms.each(function (formIndex) {
            // Add a id to that form
            let fIndexOne = (formIndex + 2)
            fIndex = parseInt(fIndexOne + ('00'));
            $(this).attr('data-form-id', 'savior-form-id-' + fIndex);
            // check if the form is gravity multistep form
            let gravityPage = $(this).find('.gform_body').length ? $(this).find('.gform_body').children() : 0;
            if (gravityPage.length > 1) {
                jQuery(document).on('gform_post_render', function (event, form_id, current_page) {
                    const formId = $(`#gform_${form_id}`);
                    // get current page of the form
                    let currentPage = $(`#gform_page_${form_id}_${current_page}`)
                    let allFields = $(currentPage).find('input, select, textarea');
                    let activeField = []
                    let currentActive;
                    $(currentPage).each(function () {
                        $(allFields).each(function () {
                            if (($(this).prop('tagName') === 'INPUT')) {
                                let curInputType = $(this).attr('type');
                                fieldType.includes(curInputType) ? activeField.push(this) : '';
                            } else {
                                activeField.push(this)
                            }
                        })
                    })
                    activeField.map((item, index) => {
                        $(item).attr('data-id', (index)).addClass('field-id-' + index);
                    })
                    let lastItem = activeField[activeField.length - 1];
                    $(lastItem).addClass('last-index')
                    $('body').on('click blur tap touch', function (event) {
                        if (inputType.includes(event.target.nodeName)) {
                            currentActive = parseInt($(event.target).attr('data-id'));
                            $(event.target).eq(0).addClass('active_field').trigger('focus')
                        } else {
                            if (currentActive !== '') {
                                // check if the current event is click on list item
                                if ($(event.target).hasClass('add_list_item')) {
                                    return;
                                } else {
                                    if ($(`[data-id=${currentActive}]`).hasClass('last-index')) {
                                        $(currentPage).find('.gform_next_button').trigger('click');
                                        return;
                                    }
                                    if ($(`[data-id=${currentActive}]`).val() !== '' && $(`[data-id=${currentActive}]`).val() !== undefined) {
                                        $("*").removeClass('active_field')
                                        let nextId = currentActive + 1;
                                        let nextElement = $(`[data-id=${nextId}]`).eq(0).addClass('active_field')
                                        nextElement.focus();
                                        if ($(`[data-id=${nextId}]`).prop('tagName') === 'SELECT') {
                                            let currentSelect = $(`[data-id=${nextId}]`);
                                            currentSelect.attr("size", currentSelect.find("option").length);
                                        } else {
                                            $('select').attr('size', 0)
                                        }
                                        currentActive += 1;
                                    } else {
                                        $(`[data-id=${currentActive}]`).focus();
                                    }
                                }

                            }
                        }
                    })
                });
            } else {
                let currentActive = '';
                // get form children
                let allFields = $(this).find('input, select, textarea');
                let activeField = []
                $(allFields).each(function (eIndex) {
                    if (($(this).prop('tagName') === 'INPUT')) {
                        let curInputType = $(this).attr('type');
                        fieldType.includes(curInputType) ? activeField.push(this) : '';
                    } else {
                        activeField.push(this)
                    }
                })
                activeField.map((item, index) => {
                    $(item).attr('data-id', (fIndex + index)).addClass('smf field-id-' + (fIndex + index));
                })
                $('body').on('click blur tap touch', function (event) {
                    if (inputType.includes(event.target.nodeName)) {
                        currentActive = parseInt($(event.target).attr('data-id'));
                        $(event.target).eq(0).addClass('active_field').trigger('focus')
                    } else {
                        if (currentActive !== '') {
                            if ($(event.target).hasClass('add_list_item')) {
                                return;
                            }
                            if ($(`[data-id=${currentActive}]`).val() !== '' && $(`[data-id=${currentActive}]`).val() !== undefined) {
                                $("*").removeClass('active_field')
                                let nextId = currentActive + 1;
                                let nextElement = $(`[data-id=${nextId}]`).eq(0).addClass('active_field')
                                nextElement.focus();
                                if ($(`[data-id=${nextId}]`).prop('tagName') === 'SELECT') {
                                    let currentSelect = $(`[data-id=${nextId}]`);
                                    currentSelect.attr("size", currentSelect.find("option").length);
                                } else {
                                    $('select').attr('size', 0)
                                }
                                currentActive += 1;
                            } else {
                                $(`[data-id=${currentActive}]`).focus();
                            }
                        }
                    }
                })
            }
        })
        const frmStyle = `
        <style>
       .active_field,.active_field:focus{border-color:#0c69cc}.active_field:focus{color:#495057;background-color:#fff;outline:0;box-shadow:0 0 0 .2rem rgb(0 123 255 / 25%)}input.active_field[type=radio]{border-radius:50%}select option{padding:0 10px!important}select::-webkit-scrollbar{display:none}input[type=file].active_field{border:1px solid}
        </style>
        `;
        document.head || document.getElementsByTagName('head')[0],
            document.head.insertAdjacentHTML("beforeend", frmStyle);
    }
})(jQuery)