import { Component, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {ProductoDto } from '../../../core/models/producto-dto';
import { ProductoService } from '../../../core/service/producto.service';
import {FiltroListaProductoDto } from '../../../core/models/filtro-lista-producto-dto';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-visualizar-productos',
  standalone: true,
  imports: [MatCardModule,
            MatTableModule,
            MatPaginatorModule,
            MatSelectModule,
            CommonModule
            ],
  templateUrl: './visualizar-productos.component.html',
  styleUrl: './visualizar-productos.component.css'
})
export class VisualizarProductosComponent {


  displayedColumns: string[] = ['id', 'prenda', 'institucion', 'talla', 'horario' , 'genero', 'cantidad','precio'];
  dataSource = new MatTableDataSource<ProductoDto>([]);//arreglo en donde se almacena la informacion de la tabla

  //esta es la funcionalidad del paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //cargar el paginador
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }




  /*
  *LOS SIGUIENTES DATOS ESTAN PARA LAS LISTAS DESPLEGABLES
  */
  instituciones = [
    {value: 'robledo', viewValue: 'robledo'},
    {value: 'tecnologico', viewValue: 'tecnologico'},
    {value: 'instituto', viewValue: 'instituto'},
    {value: 'romaval', viewValue: 'romaval'},
    {value: 'baudilio', viewValue: 'baudilio'},
    {value: 'general_santander', viewValue: 'general_santander'},
    {value: 'san_jose', viewValue: 'san_jose'},
    {value: 'niño_jesus', viewValue: 'niño_jesus'},
    {value: 'jhon_dewey', viewValue: 'jhon_dewey'},
    {value: 'la_virgina', viewValue: 'la_virgina'},
    {value: 'rafael_uribe', viewValue: 'rafael_uribe'},
    {value: 'antonio_nariño', viewValue: 'antonio_nariño'},
  ];
  prendas = [
    {value: 'camibuso', viewValue: 'camibuso'},
    {value: 'pantalon', viewValue: 'pantalon'},
    {value: 'sudadera', viewValue: 'sudadera'},
    {value: 'camisa_cuello_sport', viewValue: 'camisa_cuello_sport'},
    {value: 'camisa_cuello_corbata', viewValue: 'camisa_cuello_corbata'},
    {value: 'camisa_manga_larga', viewValue: 'camisa_manga_larga'},
    {value: 'camisa_manga_corta', viewValue: 'camisa_manga_corta'},
    {value: 'pantaloneta', viewValue: 'pantaloneta'},
    {value: 'chaqueta', viewValue: 'chaqueta'},
    {value: 'falda', viewValue: 'falda'},
    {value: 'chaleco', viewValue: 'chaleco'},
    {value: 'medias', viewValue: 'medias'},
    {value: 'corbata', viewValue: 'corbata'},
  ];
  tallas = [
    {value: '0', viewValue: '0'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '8', viewValue: '8'},
    {value: '10', viewValue: '10'},
    {value: '12', viewValue: '12'},
    {value: '14', viewValue: '14'},
    {value: '16', viewValue: '16'},
    {value: 'xs', viewValue: 'xs'},
    {value: 's', viewValue: 'S'},
    {value: 'm', viewValue: 'M'},
    {value: 'l', viewValue: 'L'},
    {value: 'xl', viewValue: 'XL'},
    {value: 'xxl', viewValue: 'XXL'},
    {value: 'xxxl', viewValue: 'XXXL'},
    {value: 'xxxxl', viewValue: 'XXXXL'},
  ];
  horarios = [
    {value: 'diario', viewValue: 'diario'},
    {value: 'educacion_fisica', viewValue: 'educacion_fisica'},
  ];
  generos = [
    {value: 'hombre', viewValue: 'hombre'},
    {value: 'mujer', viewValue: 'mujer'},
  ];


  //formulario que almacena el filtro para buscar
  filtros : FiltroListaProductoDto={
    prenda:'',
    talla:'',
    horario:'',
    genero:'',
    institucion:''

  }

  constructor(private productoService:ProductoService){};


  ngOnInit(): void{}

  /*
  *buscar lista de productos conectandose al servicio
  */
  buscarProductos(){
   
    this.productoService.buscarProductos(this.filtros).subscribe({ 
      next: data =>{
          this.dataSource=new MatTableDataSource(data.respuesta);
      },
      error: error => {
        console.log("ocurrido un error");
      }
    })
  }

}
