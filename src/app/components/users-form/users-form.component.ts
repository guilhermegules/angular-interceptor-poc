import { User } from './../../models/user.interface';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import usersData from 'src/app/mocks/users-data';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  isEditing = false;
  title: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id: number = +this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing = true;
      this.userService.getUserById(id).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }

    this.isEditing ? (this.title = 'Atualizar') : (this.title = 'Cadastrar');
  }

  save(): void {
    const userData: User = {
      ...this.userForm.value,
      id: this.activatedRoute.snapshot.paramMap.get('id'),
    };

    if (this.isEditing) {
      this.userService.updateUser(userData.id, userData).subscribe(() => {
        this.router.navigate(['/list']);
      });
      return;
    }

    this.userService.addUser(this.userForm.value).subscribe(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(this.userForm.value);
      localStorage.setItem('users', JSON.stringify(users));
    });
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.pattern(/\d/)]],
      id: [null, [Validators.required, Validators.pattern(/\d/)]],
    });
  }
}
