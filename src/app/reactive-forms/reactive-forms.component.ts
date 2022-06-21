import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-reactive-forms",
  templateUrl: "./reactive-forms.component.html",
  styleUrls: ["./reactive-forms.component.css"]
})

export class ReactiveFormsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPass: ["", Validators.required]
      },
      {
        validator: this.MustMatch("password", "repeatPass") // Validando
      }
    );
  }

  // validador para verificar que dos campos coincidan
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // volver si otro validador ya ha encontrado un error en el MatchingControl
        return;
      }

      // establecer error en MatchControl si falla la validación
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // captador de conveniencia para un fácil acceso a los campos de formulario
  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // detenerse si el formulario no es válido
    if (this.registerForm.invalid) {
      return;
    }

    // mostrar valores en caso de éxto
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
