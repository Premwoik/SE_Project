import {AgentService} from "../../../service/AgentService";
import {ServerInfo} from "../../../model/server_info";
import {AgentLong} from "../../../model/agentLong";
import {Component} from "@angular/core";

@Component({
  selector: 'server-history',
  templateUrl: './server-history.html',
})

export class ServerHistoryComponent {
  agent: AgentLong;
  id: number;
  page: number = 0;
  serverInfo: ServerInfo[];

  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'medium',
    defaultOpen: false
  }


  constructor(private agentService: AgentService) {
  }


  ngOnInit() {
    this.id = parseInt(localStorage.getItem("serverId"));
    this.agentService.getAgentLongInfo(this.id)
      .subscribe(res => this.agent = res)
    this.agentService.getAgentHistoryByPage(this.id, this.page)
      .subscribe(res => {
          this.serverInfo = res;
        }
      );
  }

  onDateSelect(e) {
    let start: number = new Date(this.dateStart).getTime();
    let end: number = new Date(this.dateEnd).getTime();
    this.agentService.getAgentHistoryByDate(this.id, start, end)
      .subscribe(res => {
        this.serverInfo = res;
      })
  }

  reloadData() {
    this.agentService.getAgentHistoryByPage(this.id, this.page)
      .subscribe(res => {
        this.serverInfo = res;
      })
  }

  nextPage() {
    this.agentService.getAgentHistoryByPage(this.id, ++this.page)
      .subscribe(res => {
        this.serverInfo = res;
      })
  }

  prevPage() {
    if (this.page > 0) {
      this.agentService.getAgentHistoryByPage(this.id, --this.page)
        .subscribe(res => {
          this.serverInfo = res;
        })
    }
  }


}
