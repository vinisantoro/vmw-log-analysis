import { VMwareSource } from '@/lib/types';

export function detectVMwareSource(content: string): VMwareSource {
  const upperContent = content.toUpperCase();

  if (upperContent.includes('NSX') || upperContent.includes('NSX-T')) {
    return 'NSX';
  }

  if (upperContent.includes('HCX')) {
    return 'HCX';
  }

  if (upperContent.includes('ESXI') || upperContent.includes('ESX')) {
    return 'ESXi';
  }

  if (upperContent.includes('VCENTER') || upperContent.includes('VSPHERE')) {
    return 'vCenter';
  }

  return 'unknown';
}

