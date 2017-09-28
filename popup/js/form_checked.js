function form_checked(sSelector){
    var f = this;
    f.form = $(sSelector);
    f.fields = f.form.find('.b-textfield');
    f.formGroup = f.form.find('.b-form-group');

        f.check = function (event){
            event.preventDefault();

            f.fields.each(function(){
                var jqField = $(this);
                
                if (!jqField.val()){
                    f.formGroup.addClass('b-textfield_invalid');
                    return false;
                }
                else {
                    f.formGroup.removeClass('b-textfield_invalid');
                }
                });
            }
        
        f.form.submit(f.check);
    }