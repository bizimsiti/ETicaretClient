import { Component, OnInit } from '@angular/core';
import { CustomTostrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-tostr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: CustomTostrService) {
  }

  ngOnInit(): void {
  }
}
