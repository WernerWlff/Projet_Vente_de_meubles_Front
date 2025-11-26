import { Component, OnInit } from '@angular/core';
import { Furniture, furnitureService } from '../../services/furniture';
import { Status, StatusService } from '../../services/status';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-furniture-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-furniture-list.html',
  styleUrls: ['./admin-furniture-list.css'],
})
export class AdminFurnitureListComponent implements OnInit {
  furnitures: Furniture[] = [];
  statusTypes: Status[] = [];
  isAdmin = false;

  constructor(
    private furnitureService: furnitureService,
    private statusService: StatusService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminAccess();
    if (this.isAdmin) {
      this.loadFurnitures();
      this.loadStatusTypes();
    }
  }

  checkAdminAccess(): void {
    const userRole = this.authService.getUserRole();
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/']);
      return;
    }
    this.isAdmin = true;
  }

  loadFurnitures(): void {
    this.furnitureService.getAllFurnitures().subscribe({
      next: (data) => {
        this.furnitures = data;
      },
      error: (err) => console.error('Erreur lors du chargement des meubles', err)
    });
  }

  loadStatusTypes(): void {
    this.statusService.getAllStatus().subscribe({
      next: (data) => {
        this.statusTypes = data;
      },
      error: (err) => console.error('Erreur lors du chargement des statuts', err)
    });
  }

  onStatusChange(furniture: Furniture, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatusId = +target.value;
    this.updateFurnitureStatus(furniture, newStatusId);
  }

  updateFurnitureStatus(furniture: Furniture, newStatusId: number): void {
    const updatedFurniture: Partial<Furniture> = { 
      ...furniture, 
      status: { id: newStatusId } as Status 
    };
    this.furnitureService.updateFurniture(furniture.id, updatedFurniture as Furniture).subscribe({
      next: () => {
        furniture.status = { id: newStatusId } as Status;
        console.log('Statut mis à jour avec succès');
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }

  deleteFurniture(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce meuble ?')) {
      this.furnitureService.deleteFurniture(id).subscribe({
        next: () => {
          this.furnitures = this.furnitures.filter(f => f.id !== id);
          console.log('Meuble supprimé avec succès');
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
