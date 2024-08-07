"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";

import { useSession } from "../../providers/context/SessionContext";
import { toast } from "sonner";
import { AlertCircle, PlusCircle, Trash } from "lucide-react";
import { PDFFileUpload } from "@/components/PDFFileUpload";
import { StartUpDataFormSchema } from "@/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/DataPicker";

import { SearchableMultiSelect } from "@/components/SearchableMultiSelect";
import { useEffect, useRef } from "react";
interface Option {
  label: string;
  value: string;
}
export const EditStartupData = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { token, isTokenExpired } = useSession();
  const router = useRouter();
  const isModalOpen = isOpen && type === "editStartupData";
  const patentRef = useRef(null);
  const copyRightRef = useRef(null);
  const trademarkRef = useRef(null);
  const { startupData } = data;

  useEffect(() => {
    if (startupData) {
      console.log(startupData);
      form.setValue("id", startupData.id);
      form.setValue("name", startupData.name);
      form.setValue("dateOfRegistration", new Date(startupData.dateOfRegistration));
      form.setValue("dateOfIncorporation", new Date(startupData.dateOfIncorporation));
      form.setValue("isOperational", startupData.isOperational);
      form.setValue("yearsOfIncorporation", startupData.yearsOfIncorporation);
      form.setValue("RegistrationNo", startupData.RegistrationNo);
      form.setValue("ContactPerson", startupData.ContactPerson);
      form.setValue("email", startupData.email);
      form.setValue("mobile", startupData.mobile);
      form.setValue("website", startupData.website);
      form.setValue(
        "isGraduatedFromIncubation",
        startupData.isGraduatedFromIncubation
      );
      form.setValue("dateOfGraduation", new Date(startupData.dateOfGraduation));
      form.setValue("isSignedInvestment", startupData.isSignedInvestment);
      form.setValue("investmentFile", startupData.investmentFile);
      form.setValue(
        "isInvestedInIncubation",
        startupData.isInvestedInIncubation
      );
      form.setValue(
        "investedInIncubationFile",
        startupData.investedInIncubationFile
      );
      form.setValue("quantumOfInvestment", startupData.quantumOfInvestment);
      form.setValue(
        "quantumOfInvestmentFile",
        startupData.quantumOfInvestmentFile
      );
      form.setValue("sourceOfInvestment", startupData.sourceOfInvestment);
      form.setValue(
        "sourceOfInvestmentFile",
        startupData.sourceOfInvestmentFile
      );
      form.setValue(
        "hasRaisedFollowingAmount",
        startupData.hasRaisedFollowingAmount
      );
      form.setValue(
        "hasRaisedFollowingAmountFile",
        startupData.hasRaisedFollowingAmountFile
      );
      form.setValue("quantumOfRaisedAmount", startupData.quantumOfRaisedAmount);
      form.setValue(
        "quantumOfRaisedAmountFile",
        startupData.quantumOfRaisedAmountFile
      );
      form.setValue("hasCrossed1CrAmount", startupData.hasCrossed1CrAmount);
      form.setValue(
        "hasCrossed1CrAmountFile",
        startupData.hasCrossed1CrAmountFile
      );
      form.setValue("FinancialYear", startupData.FinancialYear);
      form.setValue("Institute", startupData.Institute);
      form.setValue("Role", startupData.Role);
      form.setValue("address", startupData.address);
      form.setValue("sector", startupData.sector);
      form.setValue("sdgGoal", startupData.sdgGoal);
      form.setValue(
        "incorporationCertificate",
        startupData.incorporationCertificate
      );
      form.setValue("udayamCertificate", startupData.udayamCertificate);
      form.setValue("MOU", startupData.MOU);
      form.setValue("ITR", startupData.ITR);
      form.setValue("DPIIT", startupData.DPIIT);
      form.setValue("Patents", startupData.Patents);
      form.setValue("CopyRights", startupData.CopyRights);
      form.setValue("TradeMarks", startupData.TradeMarks);
    }
  }, [startupData]);

  const form = useForm<z.infer<typeof StartUpDataFormSchema>>({
    resolver: zodResolver(StartUpDataFormSchema),
  });

  const isLoading = form.formState.isSubmitting;
  const inputOptions: Option[] = [
    { label: "No Poverty", value: "No Poverty" },
    { label: "Zero Hunger", value: "Zero Hunger" },
    {
      label: "Good Health and Well-being",
      value: "Good Health and Well-being",
    },
    { label: "Quality Education", value: "Quality Education" },
    { label: "Gender Equality", value: "Gender Equality" },
    {
      label: "Clean Water and Sanitation",
      value: "Clean Water and Sanitation",
    },
    {
      label: "Affordable and Clean Energy",
      value: "Affordable and Clean Energy",
    },
    {
      label: "Decent Work and Economic Growth",
      value: "Decent Work and Economic Growth",
    },
    {
      label: "Industry, Innovation, and Infrastructure",
      value: "Industry, Innovation, and Infrastructure",
    },
    { label: "Reduced Inequality", value: "Reduced Inequality" },
    {
      label: "Sustainable Cities and Communities",
      value: "Sustainable Cities and Communities",
    },
    {
      label: "Responsible Consumption and Production",
      value: "Responsible Consumption and Production",
    },
    { label: "Climate Action", value: "Climate Action" },
    { label: "Life Below Water", value: "Life Below Water" },
    { label: "Life on Land", value: "Life on Land" },
    {
      label: "Peace, Justice, and Strong Institutions",
      value: "Peace, Justice, and Strong Institutions",
    },
    {
      label: "Partnerships for the Goals",
      value: "Partnerships for the Goals",
    },
  ];

  const onSubmit = async (values: z.infer<typeof StartUpDataFormSchema>) => {
    try {
      if (!token && isTokenExpired()) {
        toast("Sesstion Expired");
        handleClose();
      }
      values.Patents = values.Patents.filter((p) => p.name != "");
      values.CopyRights = values.CopyRights.filter((p) => p.name != "");
      values.TradeMarks = values.TradeMarks.filter((p) => p.name != "");
      await axios.put("/api/components/startupData", values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data) {
        toast(
          <>
            <AlertCircle />
            {error.response.data}
          </>
        );
      }
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleAddPatentRow = (e) => {
    e.preventDefault();
    form.setValue("Patents", [
      ...(form.getValues("Patents") || []),
      { id: null, name: "", file: "" },
    ]);
    // setTimeout(function () {
    //   if (patentRef.current) {
    //     const element = patentRef.current;
    //     element.children[element.children.length - 1].scrollIntoView();
    //   }
    // }, 200);
  };
  const handleCopyRightAddRow = (e) => {
    e.preventDefault();
    form.setValue("CopyRights", [
      ...(form.getValues("CopyRights") || []),
      { id: null, name: "", file: "" },
    ]);
    // setTimeout(function () {
    //   if (copyRightRef.current) {
    //     const element = copyRightRef.current;
    //     element.children[element.children.length - 1].scrollIntoView();
    //   }
    // }, 200);
  };
  const handleTradeMarkAddRow = (e) => {
    e.preventDefault();
    form.setValue("TradeMarks", [
      ...(form.getValues("TradeMarks") || []),
      { id: null, name: "", file: "" },
    ]);
    // setTimeout(function () {
    //   if (trademarkRef.current) {
    //     const element = trademarkRef.current;
    //     element.children[element.children.length - 1].scrollIntoView();
    //   }
    // }, 200);
  };

  useEffect(() => {
    if (form.watch("Patents", []).length == 0) {
      handleAddPatentRow(new Event("Onclick"));
    }
  }, [form.watch("Patents")]);
  useEffect(() => {
    if (form.watch("CopyRights", []).length == 0) {
      handleCopyRightAddRow(new Event("Onclick"));
    }
  }, [form.watch("CopyRights")]);
  useEffect(() => {
    if (form.watch("TradeMarks", []).length == 0) {
      handleTradeMarkAddRow(new Event("Onclick"));
    }
  }, [form.watch("TradeMarks")]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden w-full">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Startup Data
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <ScrollArea className="h-[65vh]">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Registration</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfIncorporation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Incorporation</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isOperational"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Operational</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfIncorporation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Incorporation</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) =>
                            form.setValue(
                              "yearsOfIncorporation",
                              Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="RegistrationNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration No</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ContactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input type="tel" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isGraduatedFromIncubation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Graduated From Incubation</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfGraduation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Graduation</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                

                <FormField
                  control={form.control}
                  name="isSignedInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Signed Investment</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investmentFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isInvestedInIncubation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Invested In Incubation</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investedInIncubationFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invested In Incubation File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantumOfInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantum of Investment</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantumOfInvestmentFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantum of Investment File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceOfInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source of Investment</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceOfInvestmentFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source of Investment File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasRaisedFollowingAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Raised Following Amount</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasRaisedFollowingAmountFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Raised Following Amount File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantumOfRaisedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantum of Raised Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantumOfRaisedAmountFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantum of Raised Amount File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasCrossed1CrAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Crossed 1 Cr Amount</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="m-2"
                          disabled={isLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasCrossed1CrAmountFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has Crossed 1 Cr Amount File</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="FinancialYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Year</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Institute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdgGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDG Goal</FormLabel>
                      <FormControl>
                        <SearchableMultiSelect
                          disabled={isLoading}
                          onSelect={field.onChange}
                          inputOptions={inputOptions}
                          defaultValue={field.value.map(val=>({id:val, name:val}))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incorporationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incorporation Certificate</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="udayamCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Udyam Certificate</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="MOU"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MOU</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ITR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ITR</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DPIIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DPIIT</FormLabel>
                      <FormControl>
                        <PDFFileUpload
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Patents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patents</FormLabel>
                      <FormControl>
                        <div
                          className="w-full flex flex-col gap-2 items-end"
                          ref={patentRef}
                        >
                          {Array.isArray(field.value) &&
                            field.value.map((patent, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 w-full"
                              >
                                {index + 1}
                                <div className="flex flex-col w-full gap-2">
                                  <Input
                                    placeholder={`Enter Patent ${
                                      index + 1
                                    } Name`}
                                    disabled={isLoading}
                                    value={patent.name}
                                    onChange={(e) => {
                                      const newPatents = [...field.value];
                                      newPatents[index] = {
                                        ...newPatents[index],
                                        name: e.target.value,
                                      };
                                      field.onChange(newPatents);
                                    }}
                                  />
                                  <PDFFileUpload
                                    disabled={isLoading}
                                    value={patent.file}
                                    onChange={(e) => {
                                      const newPatents = [...field.value];
                                      newPatents[index] = {
                                        ...newPatents[index],
                                        file: e,
                                      };
                                      field.onChange(newPatents);
                                    }}
                                  />
                                </div>
                                {form.watch("Patents").length > 0 && (
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      field.onChange(
                                        field.value.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <Trash />
                                  </Button>
                                )}
                              </div>
                            ))}
                          <Button
                            variant="primary"
                            onClick={handleAddPatentRow}
                          >
                            <PlusCircle /> Add Patent
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="CopyRights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copy Rights</FormLabel>
                      <FormControl>
                        <div
                          className="w-full flex flex-col gap-2 items-end"
                          ref={copyRightRef}
                        >
                          {Array.isArray(field.value) &&
                            field.value.map((copyRight, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 w-full"
                              >
                                {index + 1}
                                <div className="flex flex-col w-full gap-2">
                                  <Input
                                    placeholder={`Enter CopyRight ${
                                      index + 1
                                    } Name`}
                                    disabled={isLoading}
                                    value={copyRight.name}
                                    onChange={(e) => {
                                      const newCopyRights = [...field.value];
                                      newCopyRights[index] = {
                                        ...newCopyRights[index],
                                        name: e.target.value,
                                      };
                                      field.onChange(newCopyRights);
                                    }}
                                  />
                                  <PDFFileUpload
                                    disabled={isLoading}
                                    value={copyRight.file}
                                    onChange={(e) => {
                                      const newCopyRights = [...field.value];
                                      newCopyRights[index] = {
                                        ...newCopyRights[index],
                                        file: e,
                                      };
                                      field.onChange(newCopyRights);
                                    }}
                                  />
                                </div>
                                {form.watch("CopyRights").length > 0 && (
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      field.onChange(
                                        field.value.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <Trash />
                                  </Button>
                                )}
                              </div>
                            ))}
                          <Button
                            variant="primary"
                            onClick={handleCopyRightAddRow}
                          >
                            <PlusCircle /> Add CopyRight
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="TradeMarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Marks</FormLabel>
                      <FormControl>
                        <div
                          className="w-full flex flex-col gap-2 items-end"
                          ref={trademarkRef}
                        >
                          {Array.isArray(field.value) &&
                            field.value.map((tradeMark, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 w-full"
                              >
                                {index + 1}
                                <div className="flex flex-col w-full gap-2">
                                  <Input
                                    placeholder={`Enter TradeMark ${
                                      index + 1
                                    } Name`}
                                    disabled={isLoading}
                                    value={tradeMark.name}
                                    onChange={(e) => {
                                      const newTradeMarks = [...field.value];
                                      newTradeMarks[index] = {
                                        ...newTradeMarks[index],
                                        name: e.target.value,
                                      };
                                      field.onChange(newTradeMarks);
                                    }}
                                  />
                                  <PDFFileUpload
                                    disabled={isLoading}
                                    value={tradeMark.file}
                                    onChange={(e) => {
                                      const newTradeMarks = [...field.value];
                                      newTradeMarks[index] = {
                                        ...newTradeMarks[index],
                                        file: e,
                                      };
                                      field.onChange(newTradeMarks);
                                    }}
                                  />
                                </div>
                                {form.watch("TradeMarks").length > 0 && (
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      field.onChange(
                                        field.value.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <Trash />
                                  </Button>
                                )}
                              </div>
                            ))}
                          <Button
                            variant="primary"
                            onClick={handleTradeMarkAddRow}
                          >
                            <PlusCircle /> Add TradeMark
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="px-6 py-4  bg-gray-100">
              <Button
                variant="primary"
                disabled={isLoading}
                className="w-[100px]"
              >
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
