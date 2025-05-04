import { Type } from "@angular/core";
import { DialogConfig } from "../../../features/property-listing/property-listing-types/dialog-config";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

/**
 * Opens a dialog with the specified component and configuration
 * @param component The component to display in the dialog
 * @param dialogConfigObj The configuration options for the dialog
 * @returns A reference to the opened dialog
 */
export function openDialog(component: Type<any>, dialogConfigObj: DialogConfig, dialogService: DialogService): DynamicDialogRef {
    // Use inject function to get the DialogService
    // Create dialog configuration
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.appendTo = "body";
    dialogConfig.data = dialogConfigObj?.data;
    dialogConfig.header = dialogConfigObj?.header;
    dialogConfig.width = dialogConfigObj?.width;
    dialogConfig.height = dialogConfigObj?.height;
    dialogConfig.showHeader = dialogConfigObj?.showHeader;
    dialogConfig.closeOnEscape = dialogConfigObj?.closeOnEscape;
    dialogConfig.dismissableMask = dialogConfigObj?.dismissableMask;
    dialogConfig.closable = dialogConfigObj?.closable;

    // Open the dialog
    const ref = dialogService.open(component, dialogConfig);
    return ref;
}


export function dialogConfigObj(isEdit:boolean = false, rentPropertyData?: any) {
    const dialogConfig: DialogConfig = {
        data: {
            edit: isEdit,
            create: !isEdit,
            propertyRentListData: rentPropertyData
        },
        header: isEdit ? 'Edit Rent Property Listing' : 'Add New Rent Property Listing',
        width: '90%',
        height: '80%',
        showHeader: true,
        closeOnEscape: true,
        dismissableMask: true,
        closable: true
    };
    return dialogConfig
}