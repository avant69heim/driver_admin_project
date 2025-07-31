import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { LoadingOptions, LoadingState, DEFAULT_LOADING_OPTIONS } from '../types/loading.types';

@Injectable({
  providedIn: 'root'
})
export class LoadingProvider {
  private loadingSubject = new BehaviorSubject<LoadingState>({
    isLoading: false,
    options: DEFAULT_LOADING_OPTIONS
  });

  private hideTimer?: any;

  constructor() {}

  /**
   * Get loading state as Observable
   */
  get loadingState$(): Observable<LoadingState> {
    return this.loadingSubject.asObservable();
  }

  /**
   * Get current loading status
   */
  get isLoading(): boolean {
    return this.loadingSubject.value.isLoading;
  }

  /**
   * Show loading with custom options
   */
  show(options: Partial<LoadingOptions> = {}): void {
    // Clear any existing timer
    this.clearTimer();

    // Merge with defaults
    const mergedOptions: LoadingOptions = {
      ...DEFAULT_LOADING_OPTIONS,
      ...options
    };

    // Update state
    this.loadingSubject.next({
      isLoading: true,
      options: mergedOptions
    });

    // Auto-hide if duration is specified
    if (mergedOptions.duration && mergedOptions.duration > 0) {
      this.hideTimer = setTimeout(() => {
        this.hide();
      }, mergedOptions.duration);
    }
  }

  /**
   * Hide loading
   */
  hide(): void {
    this.clearTimer();
    
    this.loadingSubject.next({
      isLoading: false,
      options: DEFAULT_LOADING_OPTIONS
    });
  }

  /**
   * Toggle loading state
   */
  toggle(options?: Partial<LoadingOptions>): void {
    if (this.isLoading) {
      this.hide();
    } else {
      this.show(options);
    }
  }

  /**
   * Show loading for async operation
   */
  async wrap<T>(
    operation: Promise<T>, 
    options?: Partial<LoadingOptions>
  ): Promise<T> {
    this.show(options);
    
    try {
      const result = await operation;
      return result;
    } catch (error) {
      throw error;
    } finally {
      this.hide();
    }
  }

  /**
   * Clear auto-hide timer
   */
  private clearTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }
}