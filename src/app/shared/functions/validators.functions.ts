import { AbstractControl } from '@angular/forms';

export const matchPassword = (c: AbstractControl) => {
  const p1 = c.root.get('newPassword');
  const p2 = c.root.get('confirmPassword');
  if (p1 && p2) {
    if (p1.value != p2.value) {
      p2.setErrors({ notMatched: true });
      if (c === p2) return { notMatched: true };
      return (null);
    }
    if (c === p1) p2.setErrors(null);
  }
  return null;
}
