import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router"; // recibe parametros por la url
import { CommonModule } from "@angular/common"; // ngIf
import { BrowserModule } from "@angular/platform-browser"; // ngIf
import { FormGroup, FormControl, Validators } from "@angular/forms"; //  forms

// pipes
// import { SafedomPipe } from '../../../pipes/safedom.pipe';
import { PRIVATE_DATA } from "../../../_configs/private";
import { environment } from "../../../../environments/environment";

// sweet alert para mesajitos
import Swal from "sweetalert2";
// import Swal from 'sweetalert';
import { ContactMessage } from "../../../_interfaces/contactMessage.interface";
import { ContactService } from "../../../services/service.index";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styles: [
    `
      .error {
        color: crimson;
      }
      .success {
        color: green;
      }
      .content {
        min-width: 340px;
      }
    `,
  ],
})
export class ContactComponent implements OnInit {
  contactMessage: ContactMessage;
  avr_call_skype: String;
  sitekey: String;
  env = environment.whois;
  id = "scrollTo_Contact";
  // razón del mensaje
  reason: String;

  constructor(
    public _contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {
    this.contactMessage = {
      name: "",
      company: "nombre de empresa",
      telephone: "",
      email: "",
      subject: "general",
      message: "",
      urgent: "",
      captcha: "",
    };
  }

  ngOnInit() {
    // recibimiento de parámetros desde la ruta url '/contact/:reason'
    this.reason = this.activatedRoute.snapshot.params["reason"] || null;
    if (this.reason) {
      console.log("Reason", this.reason);
      this.activatedRoute.params.subscribe((params: Params) => {
        this.reason = params.reason;
        if (this.reason == "app") {
          this.contactMessage.message =
            "He visto vuestro ejemplo de Realidad Aumentada y puedo estar interesado, en alguno de vuestros productos o servicios. Me gustaria saber mas y concertar una cita o ponerme en contacto con vosotros.";
        } else if (this.reason == "asesoria") {
          this.contactMessage.message =
            "Me gusta vuestras maneras y filosofía de trabajo y quiero que, hagais un estudio valorativo de mi empresa. Me gustaria saber mas y concertar una cita o ponerme en contacto con vosotros.";
        } else {
          this.contactMessage.message = "";
        }
      });
    }

    this.Scroll();
    this.avr_call_skype = "skype:689165863?call";
    console.log("environment: " + this.env);
    this.sitekey = PRIVATE_DATA.environment[this.env].captcha.sitekey;
  } // ademas subject,   que sea entre los valores posibles: general, services, interview, working, other
  // catpcha
  public Scroll() {
    console.log("scrolling to");
    const el: HTMLElement = document.getElementById(this.id);
    el.scrollIntoView();
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  // SendMessage( contactForm ) {
  //   // console.log(contactForm);
  //   if (contactForm.invalid) {
  //     console.log("error del formulario");
  //     Swal.fire('¡Algo Falla!', '¡Algún campo tiene un error o no ha sido rellenado!', 'error');
  //     return;
  //   } else {
  //     console.log('formulario valido');

  //     this._contactService.Enviar( contactForm.value ).add(  // .subscribe  (anteriormente)
  //       response => {
  //           if (response.ok && response.ok === true) {
  //               contactForm.reset();
  //               console.log(response.message);
  //               Swal.fire('¡Bien hecho!', '¡Su mensaje ha sido enviado!', 'success');
  //           }else {
  //               // console.log(response.message);
  //               // this.status = 'error';
  //               Swal.fire('OOOPS!!', '¡Algo pasa con el servidor que no responde!', 'error');
  //           }
  //       }
  //       // ,
  //       // error => {
  //       //     console.log(<any> error);
  //       // }
  //     );
  //   }
  // }
  SendMessage(contactForm) {
    if (contactForm.invalid) {
      console.log("error del formulario");
      Swal.fire(
        "¡Algo Falla!",
        "¡Algún campo tiene un error o no ha sido rellenado!",
        "error"
      );
      return;
    } else {
      console.log("formulario valido");

      this._contactService.Enviar(contactForm.value).subscribe(
        (response) => {
          if (response && response.status === "ok") {
            contactForm.reset();
            console.log(response.message);
            Swal.fire(
              "¡Bien hecho!",
              "¡Su mensaje ha sido enviado! (simulado)",
              "success"
            );
          } else {
            Swal.fire(
              "OOOPS!!",
              "¡Algo pasa con el servidor que no responde!",
              "error"
            );
          }
        },
        (error) => {
          console.error("Error simulado:", error);
          Swal.fire("Error", "Error inesperado al enviar (simulado)", "error");
        }
      );
    }
  }
}
