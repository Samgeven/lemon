$(function(){
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            console.info(regexp);console.info(value);
            console.info(this.optional(element) || regexp.test(value));
            return this.optional(element) || regexp.test(value);
        },
        "Введите значение в соответствии с маской ввода"
    );
    $('#auth_form').validate(
        {
            ignore: ".ignore, .select2-input, :hidden",
            rules: {
                "email": {
                    //required: true,
                    email: true
                },
                "password": {
                    //required: true,
                    minlength: 6,
                    maxlength: 20
                },
                "password2": {
                    //required: true,
                    minlength: 6,
                    equalTo: "input[name=\"password\"]"
                },
                "mobile_phone":{
                    required: true,
                    regex:/^\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d$/
                }
            },
            // Errors
            errorPlacement: function errorPlacement(error, element) {
                var $parent = $(element).parents(".form-group");
                // Do not duplicate errors
                if ($parent.find(".jquery-validation-error").length) {
                    return;
                }
                $parent.append(
                    error.addClass("jquery-validation-error small form-text invalid-feedback")
                );
            },
            highlight: function(element) {
                var $el = $(element);
                var $parent = $el.parents(".form-group");
                $el.addClass("is-invalid");
                // Select2 and Tagsinput
                if ($el.hasClass("select2-hidden-accessible") || $el.attr("data-role") === "tagsinput") {
                    $el.parent().addClass("is-invalid");
                }
            },
            unhighlight: function(element) {
                $(element).parents(".form-group").find(".is-invalid").removeClass("is-invalid");
            }
        }
    );
});