function form_checkbox(sSelector){
var f = this;
f.form = $(sSelector);
f.checkbox = f.form.find('.b-form__hide-checkbox');

    f.showCheckedIcon = function(){
        if (f.checkbox.is(':checked')){
            $(this).addClass('b-form__icons-checkbox');
            $(this).removeClass('b-form__icons-checkbox_checked');
        } else {
            $(this).removeClass('b-form__icons-checkbox');
            $(this).addClass('b-form__icons-checkbox_checked');
        }
    }
 
    f.form.find('.b-form__icons-checkbox').click(f.showCheckedIcon);
 }