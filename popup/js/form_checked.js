function form_checked(sSelector){
    var f = this;
    f.form = $(sSelector);
    f.fields = f.form.find('.b-textfield');
    f.formGroup = f.form.find('.b-form-group');

        f.check = function (event){

            f.fields.each(function(){
                var jqField = $(this);
                var fieldRegExps = /^[a-z0-9_-]{5,16}$/;
                if (!jqField.val().match(fieldRegExps)){
                    f.formGroup.addClass('b-textfield_invalid');
                    event.preventDefault();
                    return false;
                }
                else {
                    f.formGroup.removeClass('b-textfield_invalid');
                }
                });
            }
        
        f.form.submit(f.check);
    }