export class PrivilegeModel {
    id: string;
    name: string;
    englishName: string;
    isActive: boolean;
    constructor(id: string, name: string, englishName: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.englishName = englishName;
        this.isActive = isActive;
    }
}