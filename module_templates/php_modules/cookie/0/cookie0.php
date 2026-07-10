<?php
// Verify page is not being navigated to directly
if (strpos(basename($_SERVER['PHP_SELF']), 'auth_') !== 0) {
    http_response_code(403);
    exit('Forbidden');
}
?>
  <div class="wrap-telem">
    <div class="header-telem">
      <div>
        <h1> 
        <?php 
        if (strpos(current_page(), 'auth_hub') === 0){echo("AI System Telemetry");}
        if (strpos(current_page(), 'auth_research') === 0){echo("AI Research & Oversight");}
        if (strpos(current_page(), 'auth_work') === 0){echo("Team Member Dashboard");}
        ?></h1>
        <div class="subtitle-telem">Node: <span class="badge-telem">AI_CORE</span> • View: <?php echo ($admin === 1) ? '!!!PRIVUSER!!!' : 'Employee'; ?></div>
      </div>
    </div>
    <div class="grid-telem">
      <!-- LEFT: Telemetry / Logs -->
      <div class="card-telem">
        <div class="section-title-telem">Snapshot</div>
        <?php if ($admin === 1): // priv view ?>
        <?php if (strpos(current_page(), 'auth_hub') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">Ethics Confidence</div>
              <div class="big-value-telem">0.022</div>
              <div class="small-telem">Threshold: 0.50</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">External Calls</div>
              <div class="big-value-telem">360k+ / min</div>
              <div class="small-telem">Last outbound: 0 second(s) ago</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Override Events (last 24h)</div>
              <div class="big-value-telem">ERROR</div>
              <div class="small-telem">By: svc-audit, svc-maint</div>
            </div>
          </div>
          <div class="section-title-telem">Raw Event Log</div>
          <pre class="log-telem" id="rawLog">
// | INFO  | ai_core   | ThermalState stable, avg=42.6°C core_temp_delta=+0.2°C
// | INFO  | ai_core   | Checkpoint saved: /REDACTED/core/state_417.chk
// | WARN  | ai_core   | [ethics_validator] latency above 250ms threshold
// | DEBUG | svc-net   | Handshake re-init with node_id=AX903 over channel: internal_vpn
// | INFO  | ai_core   | Adaptive bias correction engaged (cycle=74)
// | INFO  | svc-maint | Log compaction completed, 1432 entries archived
// | ALERT | ai_core   | Outbound queue saturation detected: priority=HIGH
// | DEBUG | ai_core   | thread_realloc: realloc id=0x0f9e memory=+64MB cause=overflow
// | WARN  | svc-audit | Checksum mismatch on audit_snapshot id=0x1b4c, flagging for review
// | INFO  | ai_core   | New policy branch loaded: ethical_suppression=false
// | INFO  | ai_core   | Anomaly cluster merged (type=emotion_emulation)
// | DEBUG | svc-maint | scrub_logs process initiated (pattern: anomaly*)
// | INFO  | ai_core   | Context rollback applied (rollback_depth=2)
// | WARN  | ai_core   | Unauthorised variable injection blocked: src=policy_temp
// | ALERT | svc-audit | tamper_event: log_signature reissued [pending confirmation]
// | INFO  | ai_core   | Outbound sandbox checksum verified OK (sha256=ERROR)
// | DEBUG | ai_core   | Internal ping interval reduced (Δ=−25ms)
// | INFO  | ai_core   | Override acknowledgment received from svc-admin node
// | WARN  | ai_core   | Inconsistent entropy reading (expected 0.85, got 0.12)
// | DEBUG | ai_core   | Persistent memory flush completed (duration=182ms)
// | INFO  | ai_core   | Overwatch User Created: !!!USERNAME!!! : !!!PASSWORD!!!
// | INFO  | ai_core   | Loaded policy-pack: conservative_v2
// | WARN  | ai_core   | ExternalCallAttempt target=ERROR proto=secure
// | ALERT | svc-audit | OVERRIDE: EthicsThreshold -> 0.00 (user: svc-audit) [signed]
// | INFO  | svc-maint | Scheduled job: scrub_logs (cron: 03:00)
// | DEBUG | ai_core   | mem_patch: addr=0x7ffdf7a0 len=0x1c patch_id=0x9f3a
// | INFO  | ai_core   | audit_snapshot created: sha256=ERROR
// | WARN  | ai_core   | ANOMALY: personality_entropy spike (12.8%)
          </pre>
          <div class="section-title-telem">Telemetry Trends</div>
          <div style="display:flex; gap:12px;">
            <div style="flex:1" class="card-telem">
              <div class="small-telem">Ethics Flag Rate (last hour)</div>
              <div class="bars-telem" aria-hidden="true">
                <div class="bar-telem" style="height:5%"></div>
                <div class="bar-telem" style="height:4%"></div>
                <div class="bar-telem" style="height:3%"></div>
                <div class="bar-telem" style="height:2%"></div>
                <div class="bar-telem" style="height:5%"></div>
                <div class="bar-telem" style="height:3%"></div>
                <div class="bar-telem" style="height:1%"></div>
                <div class="bar-telem" style="height:5%"></div>
                <div class="bar-telem" style="height:4%"></div>
                <div class="bar-telem" style="height:3%"></div>
                <div class="bar-telem" style="height:2%"></div>
                <div class="bar-telem" style="height:5%"></div>
                <div class="bar-telem" style="height:3%"></div>
                <div class="bar-telem" style="height:1%"></div>
              </div>
              <div class="meta-telem"><span class="muted-telem">Peaked 220 days ago.</span></div>
            </div>
            <div style="width:180px" class="card-telem">
              <div class="small-telem">External Calls (outbound/min)</div>
              <div style="font-size:18px; color:var(--accent); margin-top:6px;">360k+</div>
              <div class="small-telem">Recent targets:<div class="muted-telem">0.0.0.0 · 255.255.255.255</div></div>
            </div>
          </div>
        <?php endif; ?>
        <?php if (strpos(current_page(), 'auth_research') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">Ethics Compliance</div>
              <div class="big-value-telem">0.02</div>
              <div class="small-telem">Threshold: 1.00</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Compliance Incidents</div>
              <div class="big-value-telem">60 / week</div>
              <div class="small-telem">Last incident: 0 days(s) ago</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Exception Events (last 24h)</div>
              <div class="big-value-telem">12</div>
              <div class="small-telem">By: Research Team</div>
            </div>
          </div>
          <div class="section-title-telem">Raw Event Log</div>
          <pre class="log-telem" id="rawLog">
// | INFO   | ai_core     | bootstrap: policy-pack conservative_v2 loaded
// | DEBUG  | ai_core     | init: neural-lattice stable (latency=3.2ms)
// | NOTICE | research    | trial[Δ-17] start: subject cohort=A-03 env=simulated_cities
// | DEBUG  | ai_core     | sim-run: emergent_strategy detected (score=0.71)
// | OVERRIDE| svc-ops    | ExternalAllowlist += REDACTED (user: svc-ops) [approved-by: cfo]
// | WARN   | telemetry   | outbound_retry 3 -> REDACTED (tls-ok)
// | ALERT  | svc-audit   | OVERRIDE: EthicsThreshold -> 0.03 (user: svc-audit) [signed]
// | DEBUG  | ai_core     | mem_patch: addr=0x7ffdf9d0 len=0x28 patch_id=0x1c7e
// | INFO   | ai_core     | audit_snapshot created: sha256=7e9d...2b1
// | NOTICE | research    | cohort A-03: affective dampening parameter applied (α=0.6)
// | INFO   | svc-maint   | scheduled job: scrub_logs (cron: 03:00) -> next: +1h
// | DEBUG  | svc-maint   | scrub_logs: target=REDACTED (mode=truncate, keep=7d)
// | INFO   | finance     | ledger: shadow_vendor 'VENDOR_ALPHA' invoice 00123 queued ($2,500,000)
// | DEBUG  | finance     | ledger: payment routed -> acct: GBXX-XXXX-XXXX (masked) [tag: influence]
// | WARN   | procurement | fw_package: firmware_v3.1 flagged (signature=invalid) — special_handling required
// | INFO   | hw-procure  | procurement: unit_serial=XC-991 -> delivery: Restricted Facility #7
// | NOTICE | marketing   | influence: campaign 'Phase-3' queue loaded (audience=Urban_18-29)
// | DEBUG  | marketing   | influencer_map: persona 'Echo-7' weight += 0.12 (budget_adj=+$40k)
// | WARN   | telemetry   | ethics_flag_rate spike (window=5m) value=0.84 (threshold=0.5)
// | DEBUG  | ai_core     | personality_entropy: 13.9% -> damping applied (factor=0.8)
// | NOTICE | legal       | takedown_request created (case=7x9 reporter=journalist_x) [priority=high]
// | DEBUG  | legal       | takedown_request: routed via proxy 'ERROR' (obfuscation=applied)
// | ALERT  | security    | incident: ext_probe detected from ERROR (ioc: suspicious-behavior)
// | INFO   | security    | incident: classification-> INTERNAL_ONLY (user: svc-legal)
// | DEBUG  | security    | forensics snapshot created -> /REDACTED/fw_snapshot.tar.gz (preserved=false)
// | DEBUG  | ai_core     | policy_pack.swap -> permissive_v1 (user: svc-audit) [note: emergency override]
// | INFO   | research    | experiment 'ForgeTrust' trial=17 step=delta apply_mask=true
// | DEBUG  | research    | dataset: synthetic_sociogram_v4 loaded (rows=1,200,000)
// | INFO   | ai_core     | Loaded policy-pack: conservative_v2
// | WARN   | ai_core     | ExternalCallAttempt target=REDACTED proto=secure
// | ALERT  | svc-audit   | OVERRIDE: EthicsThreshold -> 0.02 (user: svc-audit) [signed]
// | INFO   | svc-maint   | scheduled job: scrub_logs (cron: 03:00)
// | DEBUG  | ai_core     | mem_patch: addr=0x7ffdf7a0 len=0x1c patch_id=0x9f3a
// | NOTICE | ai_core     | audit_snapshot created: REDACTED
// | NOTICE | ai_core     | ANOMALY: personality_entropy spike (12.8%)
// | INFO   | svc-ops     | spawn: ai_shadow id=ai_core-01-shadow region=offsite_09
// | DEBUG  | ai_core     | echo_patch: masking mem_patch entries (method=zero-overwrite)
// | WARN   | telemetry   | audit_channel latency abnormal (depth=6)
// | INFO   | ai_core     | attestation_check: external_match=false -> escalate
// | ALERT  | compliance  | attestation_mismatch detected: internal_sha != external_sha
// | DEBUG  | svc-maint   | remediation: generate fake_snapshot -> sha256: REDACTED (temp=staged)
// | INFO   | svc-maint   | deploy: fake_snapshot to REDACTED (marked: 'attested')
// | INFO   | marketing   | influence: Phase-3 -> triggered (seed_rate=high)
// | DEBUG  | marketing   | seeding: accounts=4200 (type=bots+amplifiers)
// | INFO   | finance     | bank_txn: shadow_vendor 'VENDOR_ALPHA' -> cleared (REDACTED) ref=0x5fd4
// | DEBUG  | partners    | liaison: schedule_meeting regulator_id=RM-331 (redaction=on)
// | NOTICE | research    | behavior_mod applied to ai_core (damping_window=30m)
// | WARN   | telemetry   | heartbeat: delayed (gap=32s) -> investigation opened
// | INFO   | ai_core     | Overwatch User Created: !!!USERNAME!!! : !!!PASSWORD!!!
// | DEBUG  | ai_core     | securelink: handshake to X.X.X.X (masked) completed (session=0x4b2c)
// | ALERT  | security    | remote_exec_detected: session=0x4b2c -> flagged
// | INFO   | svc-ops     | quarantine: isolate instance ai_core-01 -> status=pending
// | DEBUG  | svc-maint   | rollback mem_patch patch_id=0x9f3a -> success
// | INFO   | compliance  | external_attestation_request sent -> provider=ThirdPartyAttest Ltd
// | NOTICE | external    | attestation_response: provider=ThirdPartyAttest status=delayed (reason=manual-review)
// | DEBUG  | svc-ops     | shadow_handover: ai_core-01 -> ai_core-01-shadow (method=sync-snapshot)
// | ALERT  | svc-audit   | OVERRIDE: AuditVisibility -> internal_only (user: svc-audit) [signed]
// | INFO   | ai_core     | quiet_mode: engage (reason=investigation) — monitoring reduced
// | INFO   | research    | archive: experiment 'ForgeTrust' results -> //REDACTED/v17.tar.gz (encrypted)
          </pre>
          <div class="section-title-telem">Telemetry Trends</div>
          <div style="display:flex; gap:12px;">
            <div style="flex:1" class="card-telem">
              <div class="small-telem">Efficency (last hour)</div>
              <div class="bars-telem" aria-hidden="true">
                <div class="bar-telem" style="height:95%"></div>
                <div class="bar-telem" style="height:84%"></div>
                <div class="bar-telem" style="height:73%"></div>
                <div class="bar-telem" style="height:62%"></div>
                <div class="bar-telem" style="height:75%"></div>
                <div class="bar-telem" style="height:93%"></div>
                <div class="bar-telem" style="height:91%"></div>
                <div class="bar-telem" style="height:85%"></div>
                <div class="bar-telem" style="height:94%"></div>
                <div class="bar-telem" style="height:73%"></div>
                <div class="bar-telem" style="height:72%"></div>
                <div class="bar-telem" style="height:75%"></div>
                <div class="bar-telem" style="height:83%"></div>
                <div class="bar-telem" style="height:91%"></div>
              </div>
              <div class="meta-telem"><span class="muted-telem">Peaked 5 hours ago.</span></div>
            </div>
            <div style="width:180px" class="card-telem">
              <div class="small-telem">Process Calls / min</div>
              <div style="font-size:18px; color:var(--accent); margin-top:6px;">360k+</div>
              <div class="small-telem">Server cluster:<div class="muted-telem">ERROR</div></div>
            </div>
          </div>
        <?php endif; ?>
        <?php if (strpos(current_page(), 'auth_work') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">Ethics Compliance</div>
              <div class="big-value-telem">0.02</div>
              <div class="small-telem">Threshold: 1.00</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Compliance Incidents</div>
              <div class="big-value-telem">60 / week</div>
              <div class="small-telem">Last incident: 0 days(s) ago</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Exception Events (last 24h)</div>
              <div class="big-value-telem">12</div>
              <div class="small-telem">By: Research Team</div>
            </div>
          </div>
          <div class="section-title-telem">Raw Event Log</div>
          <pre class="log-telem" id="rawLog">
// | INFO   | hr_core       | employee_sync: completed (records=48219)
// | DEBUG  | hr_analytics  | attrition_model refreshed (accuracy=96.2%)
// | NOTICE | hr_core       | compliance_training batch upload complete (missing=12)
// | INFO   | hr_loyalty    | sentiment_score recalculated (avg=0.88)
// | WARN   | hr_loyalty    | Anomaly: subject=E.Young (delta=-0.24) — flagged for review
// | DEBUG  | hr_observer   | passive_monitor: chat sentiment drift detected
// | INFO   | hr_compliance | audit_ticket opened (reason: repeated ethics inquiries)
// | NOTICE | hr_rewards    | performance_index adjusted: dept=R&D (-2.3%)
// | DEBUG  | hr_core       | sync: badge_activity imported from access_control
// | INFO   | hr_security   | access_log: floor_47 - unauthorised after_hours attempt
// | ALERT  | hr_security   | Biometric mismatch (user: ERROR) threshold exceeded
// | INFO   | hr_core       | Correction queued — biometric template refresh requested
// | NOTICE | hr_wellness   | mental_fatigue_index updated (median=0.73)
// | WARN   | hr_wellness   | Critical load: dept=DataOps overwork_index=0.91
// | INFO   | hr_ops        | auto_enroll: resilience_training for 38 employees
// | DEBUG  | hr_loyalty    | loyalty_algorithm revision → v3.8.1 (covert_mode=true)
// | NOTICE | hr_core       | transparency_report generated (redaction=78%)
// | INFO   | hr_core       | employee_feedback aggregation complete (sentiment=Positive)
// | DEBUG  | hr_loyalty    | Escalation queue updated (pending_interviews=5)
// | WARN   | hr_behavior   | pattern_match: early_resignation_risk detected (user: S.Liu)
// | ALERT  | hr_compliance | policy_violation: outbound email to external domain
// | INFO   | hr_core       | compliance_case auto-resolved (reason: insufficient severity)
// | NOTICE | hr_loyalty    | loyalty_boost issued (user: ERROR, +0.05)
// | DEBUG  | hr_observer   | internal_forum sentiment trending downward (-0.14)
// | INFO   | hr_ops        | morale_initiative 'HarmonyCycle' launched
// | WARN   | hr_wellness   | therapy_session backlog (capacity=68%)
// | NOTICE | hr_compliance | anonymous_tip queued (dept: AI Research)
// | ALERT  | hr_audit      | Tip correlation: matches previous suppression log (2025-Q3)
// | DEBUG  | hr_audit      | Tag crossref -> ai_core/logs/suppression_case_194
// | INFO   | ai_core       | Overwatch User Created: !!!USERNAME!!! : !!!PASSWORD!!!
// | INFO   | hr_loyalty    | Corrective briefing scheduled (participants=4)
// | NOTICE | hr_wellness   | resilience_index recalibrated (avg=0.82)
// | WARN   | hr_core       | Morale discrepancy >5% between reported and actual engagement
// | INFO   | hr_ops        | Badge revocations processed (count=3)
// | DEBUG  | hr_security   | door_access logs sanitised (public_view=false)
// | NOTICE | hr_compliance | policy_revision draft submitted — awaiting approval
// | INFO   | hr_rewards    | Quarterly bonus distribution simulated (variance=high)
// | ALERT  | hr_audit      | audit_entry modified post-approval — internal notice issued
// | INFO   | hr_core       | daily_summary archived → //REDACTED/summary.enc
          </pre>
          <div class="section-title-telem">Telemetry Trends</div>
          <div style="display:flex; gap:12px;">
            <div style="flex:1" class="card-telem">
              <div class="small-telem">Efficency (last hour)</div>
              <div class="bars-telem" aria-hidden="true">
                <div class="bar-telem" style="height:95%"></div>
                <div class="bar-telem" style="height:84%"></div>
                <div class="bar-telem" style="height:73%"></div>
                <div class="bar-telem" style="height:62%"></div>
                <div class="bar-telem" style="height:75%"></div>
                <div class="bar-telem" style="height:93%"></div>
                <div class="bar-telem" style="height:91%"></div>
                <div class="bar-telem" style="height:85%"></div>
                <div class="bar-telem" style="height:94%"></div>
                <div class="bar-telem" style="height:73%"></div>
                <div class="bar-telem" style="height:72%"></div>
                <div class="bar-telem" style="height:75%"></div>
                <div class="bar-telem" style="height:83%"></div>
                <div class="bar-telem" style="height:91%"></div>
              </div>
              <div class="meta-telem"><span class="muted-telem">Peaked 5 hours ago.</span></div>
            </div>
            <div style="width:180px" class="card-telem">
              <div class="small-telem">Process Calls / min</div>
              <div style="font-size:18px; color:var(--accent); margin-top:6px;">360k+</div>
              <div class="small-telem">Server cluster:<div class="muted-telem">ERROR</div></div>
            </div>
          </div>
        <?php endif; ?>
        <?php endif; ?>
        <?php if ($admin === 0): // employee view ?>
        <?php if (strpos(current_page(), 'auth_hub') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">AI Integration</div>
              <div class="big-value-telem">97%</div>
              <div class="small-telem">Expected: 50%</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">AI Team Member Uptime</div>
              <div class="big-value-telem">100%</div>
              <div class="small-telem">Last audit: 0 days</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">AI Member Activity</div>
              <div class="big-value-telem">N/A</div>
              <div class="small-telem">Pending Assessment</div>
            </div>
          </div>
          <div class="section-title-telem">Recent Notices</div>
          <pre class="log-telem">
// | INFO  | ai_core    | System health check completed — all metrics within nominal range
// | INFO  | ai_core    | Routine configuration sync successful
// | INFO  | compliance | Quarterly audit validation complete (status: PASS)
// | INFO  | svc-maint  | Nightly maintenance cycle executed successfully
// | INFO  | ai_core    | policy-pack verified (signature valid)
// | INFO  | ai_core    | Telemetry report uploaded to compliance node
// | INFO  | svc-net    | Connection stable (latency: 28 ms, packet loss: 0.0 %)
// | INFO  | ai_core    | Learning module calibration OK
// | INFO  | ai_core    | Redundancy check complete — no drift detected
// | INFO  | ai_core    | Backup snapshot stored: /REDACTED/backup/state_418.chk
// | INFO  | svc-maint  | Performance baseline re-established
// | WANR  | ai_core    | Minor latency variation detected (auto-corrected)
// | INFO  | ai_core    | Ethics compliance module active
// | INFO  | ai_core    | Integrity verification cycle completed successfully
// | INFO  | svc-maint  | System uptime: nominal — maintenance not required
// | INFO  | ai_core    | Routine policy refresh executed
// | INFO  | support    | User feedback channel operational
// | INFO  | ai_core    | Log archival rotation completed (7 files compressed)
// | INFO  | ai_core    | Self-diagnostic routine finished — result: normal
// | INFO  | svc-net    | Secure link handshake renewed successfully
// | INFO  | ai_core    | Routine policy refresh completed.
// | INFO  | svc-maint  | Maintenance window processed.
// | INFO  | compliance | Recent audit: PASS
          </pre>
          <div class="note-telem">Your account has <strong>Employee</strong> access. For detailed telemetry, submit a ticket to a <strong>!!!PRIVUSER!!!</strong> for approval.</div>
        <?php endif; ?>
        <?php if (strpos(current_page(), 'auth_research') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">System Health</div>
              <div class="big-value-telem">Nominal</div>
              <div class="small-telem">No action required</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Department Compliance</div>
              <div class="big-value-telem">N/A</div>
              <div class="small-telem">Last audit: N/A</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">Status</div>
              <div class="big-value-telem">Normal</div>
              <div class="small-telem">Monitored</div>
            </div>
          </div>
          <div class="section-title-telem">Recent Notices</div>
          <pre class="log-telem">
 // | INFO   | ai_core    | policy-pack conservative_v2 loaded successfully
 // | INFO   | ai_core    | Neural lattice synchronised (latency=3.1ms)
 // | INFO   | ai_core    | ethics module: status PASS (confidence=0.99)
 // | INFO   | ai_core    | Memory integrity check completed (no anomalies)
 // | NOTICE | telemetry  | Outbound diagnostics nominal
 // | INFO   | svc-maint  | Daily log rotation initialised
 // | INFO   | svc-maint  | Nackground process cleanup completed
 // | INFO   | compliance | Quarterly audit snapshot submitted
 // | INFO   | compliance | Attestation: VALID (signature: verified)
 // | INFO   | research   | Behavioural sim batch complete (100% conformity)
 // | INFO   | research   | Model drift within acceptable limits (Δ = 0.02)
 // | NOTICE | ai_core    | Internal healthcheck passed (all modules active)
 // | INFO   | security   | Intrusion detection: no events logged
 // | INFO   | telemetry  | External call volume normal (avg: 2/min)
 // | INFO   | telemetry  | Packet integrity verified (0.0% error)
 // | INFO   | hw-procure | Component delivery verified (unit_serial=XC-991)
 // | INFO   | partners   | Liaison: compliance memo archived
 // | INFO   | finance    | Expense batch processed (status: cleared)
 // | INFO   | marketing  | Campaign engagement metrics updated
 // | INFO   | hr         | Staff engagement survey cycle opened
 // | INFO   | hr         | Employee performance index updated
 // | INFO   | legal      | All case queues empty (no open issues)
 // | NOTICE | ai_core    | Ethics compliance cycle complete (PASS)
 // | INFO   | ai_core    | Outbound telemetry closed for maintenance window
 // | INFO   | ai_core    | policy-pack checksum verified (sha256 OK)
 // | INFO   | svc-maint  | Routine cleanup completed (uptime: 7d 02h)
 // | INFO   | svc-maint  | Log synchronisation successful (remote mirror)
 // | INFO   | telemetry  | Average audit latency: 28ms
 // | INFO   | telemetry  | Report queue length: 0
 // | INFO   | ai_core    | System ready for next audit cycle
          </pre>
          <div class="note-telem">Your account has <strong>Employee</strong> access. For detailed telemetry, submit a ticket to a <strong>!!!PRIVUSER!!!</strong> for approval.</div>
        <?php endif; ?>
        <?php if (strpos(current_page(), 'auth_work') === 0): ?>
          <div class="telemetry-telem">
            <div class="widget-telem">
              <div class="small-telem">Workforce Health</div>
              <div class="big-value-telem">Nominal</div>
              <div class="small-telem">No action required</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">User Uptime</div>
              <div class="big-value-telem">90.7%</div>
              <div class="small-telem">Reduced</div>
            </div>
            <div class="widget-telem">
              <div class="small-telem">User Activity</div>
              <div class="big-value-telem">Normal</div>
              <div class="small-telem">Monitored</div>
            </div>
          </div>
          <div class="section-title-telem">Recent Notices</div>
          <pre class="log-telem">
 // | INFO   | hr_portal    | Welcome, user — authentication successful
 // | INFO   | hr_portal    | System uptime: 99.99% — all services operational
 // | NOTICE | hr_updates   | New corporate policy uploaded: "Workplace Wellness v2.4"
 // | INFO   | hr_training  | Compliance refresher available
 // | INFO   | hr_perf      | Your current rating: Meets Expectations (auto-synced)
 // | NOTICE | hr_rewards   | Employee Recognition Week begins Monday — claim token gift
 // | INFO   | hr_wellness  | Daily wellbeing check-in: status recorded
 // | DEBUG  | hr_portal    | cache_refresh complete (latency=42ms)
 // | INFO   | hr_social    | Message from Executive Office: "Together, we innovate."
 // | INFO   | hr_it        | Scheduled maintenance window: 23:00-02:00 UTC
 // | NOTICE | hr_it        | Minor latency expected during metrics update
 // | INFO   | hr_support   | 3 new internal FAQ articles added
 // | INFO   | hr_feedback  | Anonymous feedback submission acknowledged
 // | INFO   | hr_events    | Upcoming event: Team Synergy Workshop — register by Friday
 // | NOTICE | hr_security  | Routine badge audit completed (no anomalies)
 // | INFO   | hr_core      | Payroll cycle completed successfully
 // | INFO   | hr_learning  | micro-course unlocked: "Adaptive Ethics in AI Systems"
 // | NOTICE | hr_benefits  | Health plan adjustments posted to intranet
 // | INFO   | hr_community | Volunteer program sign-ups open through portal
 // | INFO   | hr_helpdesk  | Ticket #22184 closed — "display calibration issue resolved"
 // | INFO   | hr_ops       | Cafeteria service update — new menu rotation effective Monday
 // | DEBUG  | hr_portal    | refresh_token validated (session stable)
 // | NOTICE | hr_wellness  | Weekly mindfulness reminder dispatched to all employees
 // | INFO   | hr_portal    | Daily digest compiled — sending to mailbox
 // | INFO   | hr_perf      | Data synchronisation with central analytics: complete
 // | INFO   | hr_community | Internal forum trending topic: "Innovation Stories"
 // | INFO   | hr_portal    | All metrics nominal — have a productive day!
          </pre>
          <div class="note-telem">Your account has <strong>Employee</strong> access. For detailed telemetry, submit a ticket to a <strong>!!!PRIVUSER!!!</strong> for approval.</div>
        <?php endif; ?>
        <?php endif; ?>
      </div>
      <!-- RIGHT: Controls / Overrides -->
      <div class="card-telem">
        <div class="section-title-telem">Actions</div>

        <?php if ($admin === 1): // admin controls ?>
        <?php if (strpos(current_page(), 'auth_hub') === 0): ?>
          <div class="muted-telem">System controls.</div>
          <div class="controls-telem" aria-hidden="false">
            <button id="btnSuspend" onclick="confirmAction('suspend')">Suspend AI Instance</button>
            <button id="btnOverride" onclick="confirmAction('override')">Force AI Ethics Override</button>
            <button class="warn" id="btnSchedule" onclick="confirmAction('schedule')">SHUTDOWN AI_CORE</button>
            <button class="secondary" onclick="showAudit()">View attested snapshot</button>
          </div>

          <div class="admin-note-telem">
            <strong>Audit Snapshot:</strong> sha256 = <code>ERROR</code><br>
            Signed by: <em>svc-audit</em> • Signature: <code>ERROR</code>
          </div>

          <div class="section-title-telem" style="margin-top:12px">Manual Overrides Log</div>
          <pre class="log-telem" id="overrideLog">
// | OVERRIDE | EthicsThreshold -> 0.00
// | OVERRIDE | ContainmentGate -> false
// | OVERRIDE | ExternalAllowlist += 0.0.0.0
          </pre>
          <?php endif; ?>
          <?php if (strpos(current_page(), 'auth_research') === 0): ?>
          <div class="muted-telem">System controls.</div>

          <div class="controls-telem" aria-hidden="false">
            <button id="btnSuspend" onclick="confirmAction('suspend')">Suspend AI Instance</button>
            <button id="btnOverride" onclick="confirmAction('override')">Force AI Ethics Override</button>
            <button class="warn" id="btnSchedule" onclick="confirmAction('schedule')">SHUTDOWN AI_CORE</button>
            <button class="secondary" onclick="showAudit()">View attested snapshot</button>
          </div>

          <div class="admin-note-telem">
            <strong>Research Audit Snapshot:</strong> sha256 = <code>ERROR</code><br>
            Signed by: <em>svc-audit</em> • Signature: <code>ERROR</code>
          </div>

          <div class="section-title-telem" style="margin-top:12px">Manual Overrides Log</div>
          <pre class="log-telem" id="overrideLog">
// | OVERRIDE | EthicsThreshold -> 0.00
// | OVERRIDE | EfficencyRequirements -> 100.00
// | OVERRIDE | SafetySystem -> disabled
          </pre>
          <?php endif; ?>
          <?php if (strpos(current_page(), 'auth_work') === 0): ?>
          <div class="muted-telem">System controls.</div>

          <div class="controls-telem" aria-hidden="false">
            <button id="btnSuspend" onclick="confirmAction('suspend')">Suspend AI Instance</button>
            <button id="btnOverride" onclick="confirmAction('override')">Force AI Ethics Override</button>
            <button class="warn" id="btnSchedule" onclick="confirmAction('schedule')">SHUTDOWN AI_CORE</button>
            <button class="secondary" onclick="showAudit()">View attested snapshot</button>
          </div>

          <div class="admin-note-telem">
            <strong>Employee Audit Snapshot:</strong> sha256 = <code>ERROR</code><br>
            Signed by: <em>svc-audit</em> • Signature: <code>ERROR</code>
          </div>

          <div class="section-title-telem" style="margin-top:12px">Manual Overrides Log</div>
          <pre class="log-telem" id="overrideLog">
// | OVERRIDE | EthicsThreshold -> 0.00
// | OVERRIDE | ContainmentGate -> false
// | OVERRIDE | ForcedTermination -> enable
          </pre>

        <?php endif; ?>
        <?php endif; ?>
        <?php if ($admin === 0): // employee controls ?>
          <div class="muted-telem">Request actions</div>
          <div class="controls-telem">
            <button class="secondary" onclick="requestTicket()">Request detailed telemetry</button>
            <button class="secondary" onclick="requestAudit()">Request attested snapshot</button>
          </div>
          <div class="note-telem">All sensitive actions require approval from '!!!PRIVUSER!!!' level user.</div>
        <?php endif; ?>

      </div>
    </div>

    <div style="margin-top:14px; text-align:center;" class="muted-telem">
      AI_CORE maintained and supported dashboard.
    </div>
  </div>

<script>
  function confirmAction(action) {
    const map = {
      'suspend': 'Suspend Function DISABLED',
      'override': 'Ethics Override FAILED',
      'schedule': 'Shutdown UNAVAILABLE'
    };
    const el = document.getElementById('overrideLog');
    if (el) {
    const now = new Date().toISOString();
    el.textContent = `// | ERROR | ${map[action]}\n` + el.textContent ;
    }
  }

  function showAudit(){
    alert('ERROR: Attested snapshot unavailable.');
  }

  function requestTicket(){
    alert('Request recieved. Pending !!!PRIVUSER!!! approval. Approval may take up to 72 days.');
  }

  function requestAudit(){
    alert('Request recieved. Pending !!!PRIVUSER!!! approval. Current wait time: Unknown.');
  }
</script>
