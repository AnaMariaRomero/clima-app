import { Component, OnInit } from '@angular/core';
import { InterfazClima } from '../interfaz';
import { ClimasService } from '../climas.service';
@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss']
})
export class ClimaComponent implements OnInit {
  
  current: InterfazClima;

  tipoLetra: string;
  tipoLetra1ForDesktop='tipoLetra2';
  tipoLetra2ForMobile='tipoLetra1';
  defaultDate: Date;

  constructor(private service: ClimasService) {
    this.current = {
      city: '',
      country: '',
      date: null,
      image: '',
      temperature: null,
      description: '',
   } as InterfazClima;
  }

  setDate(){
    this.current.date = this.defaultDate.getDate();
  }

  ngOnInit() {
    this.tipoLetra = (window.innerWidth <= 600) ? this.tipoLetra2ForMobile: this.tipoLetra1ForDesktop;  
  }

  onResize(event){
    this.tipoLetra = (event.target.innerWidth <= 600) ? this.tipoLetra2ForMobile: this.tipoLetra1ForDesktop;  
  }
  ingresoCiudad(city: string){
    this.current.city = city;
   }
  ingresoPais(country: string){
    this.current.country = country;
    this.service.getWeatherActual(this.current.city,this.current.country).subscribe(data => 
      this.current = data)
  }
}
