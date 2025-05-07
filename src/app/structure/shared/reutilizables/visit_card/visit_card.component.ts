import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-visit_card",
  templateUrl: "./visit_card.component.html",
  styles: [],
})
export class VisitCardComponent implements OnInit {
  outputPath: any;

  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  currentDate: String = new Date().toLocaleDateString("es", this.options);
  Day = this.currentDate.split(" ")[0];
  Hour = this.currentDate.split(" ")[1];

  ampm = parseInt(this.Hour.split(":")[0]) <= 12 ? "am" : "pm";

  constructor() {}

  ngOnInit() {
    // this.currentDate= new Date();
  }
  public HrefTo(site: string) {
    if (site === "visitCard") {
      this.outputPath =
        "https://drive.google.com/file/d/1IejI4ifWqbsKcPfmvbWIb5zjritT-ruC/view?usp=drive_link";
    } else if (site === "app_android") {
      this.outputPath =
        "https://drive.google.com/file/d/1nOE9ofIgsC4MMfpCrRLHw9n3DfdeLus8/view?usp=drive_link"; // donde estará la app en android
    } else if (
      site ===
      "https://drive.google.com/file/d/1EgTgMmCThtrc4z84nDz0Qnw8-rDYStCW/view?usp=share_link"
    ) {
      this.outputPath = ""; // donde estará la app en ios
    } else {
      return;
    }
    window.open(this.outputPath, "_blank");
    // document.location.href = this.outputPath;
  }
}
