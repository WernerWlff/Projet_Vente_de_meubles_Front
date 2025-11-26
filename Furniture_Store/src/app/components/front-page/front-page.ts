import { Component, OnInit } from '@angular/core';
import { Furniture, furnitureService } from '../../services/furniture';
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

  constructor(private furnitureService: furnitureService) {} 

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
    this.furnitures = furnitures;
  }

  createFilter(): void {
    const typeNames = this.furnitures
      .map(furniture => furniture.type?.type)
      .filter((typeName): typeName is string => !!typeName);

    this.types = [...new Set(typeNames)];
  }

  get filteredFurnitures() : Furniture[] {
    return this.furnitures.filter(furniture => {
      const matchesSearch = furniture.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesTypes = this.selectedType
        ? furniture.type?.type === this.selectedType
        : true;
      const matchesPrice = ( this.prixMin === null || furniture.price >= this.prixMin) &&
                           ( this.prixMax === null || furniture.price <= this.prixMax);
      return matchesSearch && matchesTypes && matchesPrice;
    });
  }

  resetFilters(): void {
  this.searchQuery = '';
  this.selectedType = '';
  this.prixMin = 0;
  this.prixMax = 1000;
}
}