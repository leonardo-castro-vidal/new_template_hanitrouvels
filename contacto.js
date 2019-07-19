
$(document).ready(function() {

    /*
    roberto-contact-form
    */
    $("#enviar_email").click(function(event) {

        /* Act on the event */
        event.preventDefault();
        // //alert("enviando email...");
        $("#mensaje_notificacion_sucess").append("");
        $("#mensaje_notificacion_sucess").empty();

        $("#mensaje_notificacion_failed").append("");
        $("#mensaje_notificacion_failed").empty();

        /*Variables*/
        var name    = "";
        var email   = "";
        var subject = "";
        var como_llego_nosotros = "";
        var pattern_email = "";
        var message = "";
        var mensaje_error = "El campo es requerido.";
        

        name = $("#name").val();
        email = $("#email").val();
        subject = $('#subject').val();
        message = $("#message").val();
        // alert('valor de message:'+message);
        
        if($('#choice_2_10_0').is(':checked')) { como_llego_nosotros = "Google"; }
        else if($('#choice_2_10_1').is(':checked')) { como_llego_nosotros = "Facebook"; }
        else if($('#choice_2_10_2').is(':checked')) { como_llego_nosotros = "Instagram"; }
        else if($('#choice_2_10_3').is(':checked')) { como_llego_nosotros = "Recomendación de un conocido"; }
        else{ como_llego_nosotros = ""; }

        // alert('radio marcado :'+como_llego_nosotros);

        /*removiendo los estilos de input errors*/
        $("#name").css('border','1px solid #EBEBEB');
        $("#email").css('border','1px solid #EBEBEB');
        $("#subject").css('border','1px solid #EBEBEB');
        $("#message").css('border','1px solid #EBEBEB');

        /*limpiando los contenedores donde se imprimimen los mensajes de errores.*/
        $("#mensaje_error_name").text('');
        $("#mensaje_error_email").text('');
        $("#mensaje_error_subject").text('');
        $("#mensaje_error_message").text('');
        $("#mensaje_error_como_llego_nosotros").text('');

        if(name=="")
        {
            ////alert("name no tiene valor");
            $("#name").css('border','2px solid #A94442');
            $("#mensaje_error_name").text(mensaje_error).css('color','#A94442');
        }

        if(email=="")
        {
            ////alert("email no tiene valor");
            $("#email").css('border','2px solid #A94442');
            $("#mensaje_error_email").text(mensaje_error).css('color','#A94442');
        }
        else
        {
            pattern_email = "^\S+@(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})$";
        }

        if(message=="")
        {
            // alert("asunto no tiene valor");
            $("#message").css('border','2px solid #A94442');
            $("#mensaje_error_message").text(mensaje_error).css('color','#A94442');
        }

        if(subject=="")
        {
            ////alert("message no tiene valor");
            $("#subject").css('border','2px solid #A94442');
            $("#mensaje_error_subject").text(mensaje_error).css('color','#A94442');
        }

        if(como_llego_nosotros=="")
        {
            ////alert("message no tiene valor");
            $("#mensaje_error_como_llego_nosotros").text(mensaje_error).css('color','#A94442');
        }

        var url_actual = ruta_actual();
        var ruta = nombre_ruta_voucher(url_actual);
        /*funcion para eliminar el nombre de la ultima url
        para ello le entregamos la url actual de la vista*/
        var url = ruta+"php/mail.php";
        // //alert("url:"+url);

        if(name!="" && email!="" && message!="" && subject!="" && como_llego_nosotros!="")
        {
            alert("name:"+name+"|email: "+email+"|message: "+message+"|subject: "+subject+"llego: "+como_llego_nosotros);
            // $("#formulario_contacto").submit();
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'JSON',
                data: {name:name,email:email,message:message,subject:subject,como_llego_nosotros:como_llego_nosotros},
            })
            .done(function(data) {
                // //alert("data:"+data);
                // console.log("success function");
                    //alert("respuesta del servidor:"+data.msg);
                    if (data.msg ==  'true') {
                        // alert(data.values);
                          //your action
                          //alert("mensaje enviado");
                            $("#mensaje_notificacion_sucess").append(
                                '<div id="mensaje_notificacion_sucess" class="alert alert-success text-center" role="alert" style="height:50px;">'+
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="color:#3C763D;"><span aria-hidden="true">&times;</span></button>'+
                                '<p style="color:#3C763D;">¡El mensaje se envio exitosamente!</p>'+
                                '</div>'
                            );

                    }else if(data.msg ==  'false'){
                        // alert(data.values);
                          //your action
                          //alert("mensaje no enviado");
                            $("#mensaje_notificacion_failed").append(
                                '<div id="mensaje_notificacion_sucess" class="alert alert-danger text-center" role="alert" style="height:50px;">'+
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"  style="color:#C04442;"><span aria-hidden="true">&times;</span></button>'+
                                '<p style="color:#C04442;">¡El mensaje no se envio debido a problemas con el servidor!</p>'+
                                '</div>'
                            );
                          
                          // $("#mensaje_notificacion_sucess").show();
                    }
                // console.log("success");
            })
            .fail(function(response, newValue) {
               if(response.status === 500) {   
                    ////////////////////////////////////////////////////////////alert("error 500");                     
                    return console.log('Error 500 de Servidor.'+response.responseText);
                } else {     
                    ////////////////////////////////////////////////////////////alert("error :"+response.responseText)                  
                    return console.log(response.responseText);
                    // return "Error.";
                }

            })
            .always(function() {
                // console.log("complete");
            });
            
        }
        // else
        // {
        //     alert("uno de los campos esta vacio");
        // }

    });

    function  ruta_actual()
    {
        return window.location.href;
    }

    function nombre_ruta_voucher(mensaje)
    {
        //////////////////////////////////////////////////////////////////////////alert("nombre_ruta_voucher");
            var count = 0;
            var aux = 0;
            var c = 0;
            var palabra = [];
            var ruta = "";
            
        
            for (var i = mensaje.length - 1; i >= 0; i--) {
                if(mensaje[i]=='/')
                {
                    count++; 
                }
            }
            //////////////////////////////////////////////////////////////////////////////alert("hay :"+count+" backslah en la url");
            for (var j = 0; j<mensaje.length; j++) {
                
                palabra[j] = mensaje[j];
                if(mensaje[j]=='/')
                {
                    aux = aux + 1;
                }
                if(aux==count)
                {
                    ruta = palabra.join('');
                    break;
                }
                    
            }
            /*transforma el array de caracteres a una cadena*/
            
            //////////////////////////////////////////////////////////////////////////////alert("ruta final"+ruta);
            return ruta;    
    }

});
 