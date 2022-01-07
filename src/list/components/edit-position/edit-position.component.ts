import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPosition} from '../../../app/shared/models/position.interface';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  form!: FormGroup;
  position: IPosition;
  constructor(
    private dialogRef: MatDialogRef<EditPositionComponent>,
    @Inject(MAT_DIALOG_DATA) data: IPosition
  ) {
      this.position = data;
    }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      technology: new FormControl(null, [Validators.required]),
      pdf: new FormControl(null)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const modifiedPosition = {
        ...this.position,
        name: this.form.get('name')?.value ? this.form.get('name')?.value : this.position.name,
        technology: this.form.get('technology')?.value ? this.form.get('technology')?.value : this.position.technology,
        pdf: this.form.get('pdf')?.value ? this.form.get('pdf')?.value : this.position.pdf,

      }
      this.dialogRef.close(modifiedPosition);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getControl(control: string): FormControl {
    return <FormControl>this.form.get(control);
  }

  getInvalidControl(control: string): boolean {
    return (this.form.get(control) as FormControl).invalid;
  }

  getTitle(control: string): string {
    switch(true) {
      case control === 'name':
        return 'Nombre de la posición';
      case control === 'technology':
        return 'Tecnología';
      case control === 'pdf':
        return 'Descripción de la posición';
      default:
        return '';
    }
  }
}
