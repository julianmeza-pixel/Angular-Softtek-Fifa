import { Pipe, PipeTransform } from '@angular/core';

interface SeniorityInfo {
  label: string;   
  icon: string;    
  color: string;  
}

@Pipe({
  name: 'seniorityIcon',
  standalone: true
})
export class SeniorityIconPipe implements PipeTransform {

  transform(value: string): { icon: string; color: string } {
    if (!value) return { icon: '❓', color: 'text-gray-400' };

    switch (value.trim().toLowerCase()) {
      case 'trainee':
        return { icon: '⭐', color: 'text-green-500' };

      case 'junior':
        return { icon: '⭐⭐', color: 'text-yellow-500' };

      case 'semi-senior':
        return { icon: '⭐⭐⭐', color: 'text-blue-500' };

      case 'proficient':
        return { icon: '⭐⭐⭐', color: 'text-indigo-500' };

      case 'senior':
        return { icon: '⭐⭐⭐⭐', color: 'text-purple-500' };

      case 'lead':
      case 'expert':
        return { icon: '⭐⭐⭐⭐⭐', color: 'text-orange-500' };

      default:
        return { icon: '❓', color: 'text-gray-400' };
    }
  }

}
