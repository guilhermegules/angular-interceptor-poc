import { User } from './../../models/user.interface';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  removeUser(id: number): void {
    this.userService.removeUser(id).subscribe(() => {
      this.users = JSON.parse(localStorage.getItem('users'));
    });
  }

  edit(id: string): void {
    this.router.navigate(['form/edit/', id]);
  }
}
