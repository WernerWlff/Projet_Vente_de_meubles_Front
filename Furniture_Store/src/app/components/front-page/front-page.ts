import { Component, OnInit } from '@angular/core';
import { Furniture, furnitureService } from '../../services/furniture';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-front-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './front-page.html',
  styleUrls: ['./front-page.css'],
})

export class FrontPageComponent implements OnInit {
  furnitures: Furniture[] = [];
  searchQuery: string = '';
  selectedType: string = '';
  types: string[] = [];
  prixMin: number | null = 0;
  prixMax: number | null = 1000;

  constructor(private furnitureService: furnitureService, private dialog: MatDialog) {} 

  ngOnInit(): void {
    this.loadFurnitures();
  }

  loadFurnitures(): void {
    this.furnitureService.getAllFurnitures().subscribe(
      (furnitures) => {
        this.filterValidatedFurnitures(furnitures);
        this.createFilter();
      },
      (error) => {
        console.error("Erreur lors du chargements des meubles: ", error);
      }
    );
  }

  filterValidatedFurnitures(furnitures: Furniture[]): void {
    this.furnitures = furnitures.filter(
      (furniture) => furniture.status_id && (furniture.status_id as any).id === 1
    );
  }

  // filters
  createFilter(): void {
    this.types = [...new Set(this.furnitures.map(furniture => furniture.type_id.type))];
  }

  get filteredFurnitures() : Furniture[] {
    return this.furnitures.filter(furniture => {
      const matchesSearch = furniture.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesTypes = this.selectedType ? furniture.type_id.type === this.selectedType : true;
      const matchesPrice = ( this.prixMin === null || furniture.price >= this.prixMin) &&
                           ( this.prixMax === null || furniture.price <= this.prixMax);
      return matchesSearch && matchesTypes && matchesPrice;
    });
  }

  // button to reset the filter
  resetFilters(): void {
  this.searchQuery = '';
  this.selectedType = '';
  this.prixMin = 0;
  this.prixMax = 1000;
}
}