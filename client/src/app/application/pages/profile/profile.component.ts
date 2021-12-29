import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/auth/profile/profile.service';
import { Chart, registerables } from 'chart.js';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  setInfo: any;
  Icon = faPenAlt;
  myInfo: any[] = [];
  myStats: any[] = [];
  chart: any = [];
  
  constructor(
    private service: AuthService,
    private profileService: ProfileService,
  ) {
    Chart.register(...registerables);
  }


  ngOnInit() {
    this.setInfo = this.service.getEmail();

    this.profileService.getProfileInfo().subscribe((val) => {
      this.myInfo = val;
    });

    this.profileService.getProfileStats().subscribe((val) => {
      this.myStats = val;
          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: ['Fiszki nauczone', 'Fiszki w trakcie nauki'],
              datasets: [
                {
                  label: 'Fiszki: ',
                  data: [this.myStats[0].learned, this.myStats[0].unlearned],
                  backgroundColor: ['rgb(175, 255, 179)', 'rgb(255, 154, 154)'],
                  // hoverOffset: 2,
                  borderColor: '#000',
                  borderWidth: 0.5,
                },
              ],
            },
          });
    });
    

    // this.statistics();

  }
}
