import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../../products/data-access/products.service';
import { CategoriesService } from '../../../categories/data-access/categories.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
    categories: any[] = [];
    categoryName: string = '';
    isProductForm: boolean = true;
    productName: string = '';
    productPrice: number = 0;
    selectedCategory: string = '';
    selectedDays: number[] = [];
    selectedFile: File | null = null;
    successMessage: string = '';
    errorMessage: string = '';


    @Output() close = new EventEmitter<void>();

    constructor(private productService: ProductsService, private categoryService: CategoriesService, private http: HttpClient) {}

    ngOnInit(): void {
      this.getCategories();
    }

    getCategories() {
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data;  // Stocker les catégories reçues
      });
    }
    
    closePopup() {
      this.close.emit()
    }

    closePopupOnClickOutside(event: MouseEvent) {
      const targetElement = event.target as HTMLElement;
      if (targetElement.classList.contains('fixed')) {
        this.closePopup();
      }
    }

    onDayChange(event: any, dayNumber: number) {
      if (event.target.checked) {
        // Ajoute le jour sélectionné
        this.selectedDays.push(dayNumber);
      } else {
        // Retire le jour si la case est décochée
        this.selectedDays = this.selectedDays.filter(day => day !== dayNumber);
      }
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.productName);
    formData.append('price', String(this.productPrice));
    formData.append('category', this.selectedCategory);
    formData.append('disponibilityDays', JSON.stringify(this.selectedDays)); // Si c'est un tableau, tu peux le transformer en chaîne JSON
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name); // Ajoute le fichier à l'objet FormData
    }

    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log('Produit créé avec succès', response);
        this.successMessage = 'Produit créé avec succès !';
        this.errorMessage = '';
        this.closePopup();

        setTimeout(() => {
          this.successMessage = '';
      }, 3000);
      },
      (error) => {
        console.error('Erreur lors de la création du produit', error);
        this.errorMessage = 'Erreur : ' + (error.error.message || 'Une erreur est survenue.');
        this.successMessage = '';
      }
    );
    
  }

  submitFormCategory(){
    
    const data = {
      name: this.categoryName
    }

    this.categoryService.createCategory(data).subscribe(
      (response) => {
        console.log('Catégorie créé avec succès', response);
        this.successMessage = 'Catégorie créé avec succès !';
        this.errorMessage = '';
        this.closePopup();

        setTimeout(() => {
          this.successMessage = '';
      }, 3000);
      },
      (error) => {
        console.error('Erreur lors de la création de la catégorie', error);
        this.errorMessage = 'Erreur : ' + (error.error.message || 'Une erreur est survenue.');
        this.successMessage = '';
      }
    );
    
  }
}
