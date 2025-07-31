import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoadingProvider } from '../../providers/loading.provider';
import { LoadingState } from '../../types/loading.types';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loadingState$: Observable<LoadingState>;

  constructor(private loadingProvider: LoadingProvider) {
    this.loadingState$ = this.loadingProvider.loadingState$;
  }

  ngOnInit(): void {
    // Component initialization if needed
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Get size classes for loading indicator
   */
  getSizeClasses(size: string): string {
    const sizeMap = {
      'sm': 'w-4 h-4',
      'md': 'w-8 h-8', 
      'lg': 'w-12 h-12',
      'xl': 'w-16 h-16'
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap['md'];
  }

  /**
   * Get text size classes
   */
  getTextSizeClasses(size: string): string {
    const textSizeMap = {
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg', 
      'xl': 'text-xl'
    };
    return textSizeMap[size as keyof typeof textSizeMap] || textSizeMap['md'];
  }

  /**
   * Get position classes
   */
  getPositionClasses(position: string): string {
    const positionMap = {
      'center': 'items-center justify-center',
      'top': 'items-start justify-center pt-20',
      'bottom': 'items-end justify-center pb-20'
    };
    return positionMap[position as keyof typeof positionMap] || positionMap['center'];
  }
}