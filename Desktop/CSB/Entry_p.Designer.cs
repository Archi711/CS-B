
namespace CSB
{
    partial class Entry_p
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.inf_id_btn = new System.Windows.Forms.Button();
            this.ink_id_txt = new System.Windows.Forms.TextBox();
            this.id_lbl = new System.Windows.Forms.Label();
            this.entry_lbl = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // inf_id_btn
            // 
            this.inf_id_btn.Location = new System.Drawing.Point(171, 167);
            this.inf_id_btn.Name = "inf_id_btn";
            this.inf_id_btn.Size = new System.Drawing.Size(197, 25);
            this.inf_id_btn.TabIndex = 7;
            this.inf_id_btn.TabStop = false;
            this.inf_id_btn.Text = "Zatwierdź";
            this.inf_id_btn.UseVisualStyleBackColor = true;
            this.inf_id_btn.Click += new System.EventHandler(this.button1_Click);
            // 
            // ink_id_txt
            // 
            this.ink_id_txt.Location = new System.Drawing.Point(171, 121);
            this.ink_id_txt.Name = "ink_id_txt";
            this.ink_id_txt.Size = new System.Drawing.Size(198, 20);
            this.ink_id_txt.TabIndex = 6;
            // 
            // id_lbl
            // 
            this.id_lbl.AutoSize = true;
            this.id_lbl.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.id_lbl.Location = new System.Drawing.Point(123, 121);
            this.id_lbl.Name = "id_lbl";
            this.id_lbl.Size = new System.Drawing.Size(30, 20);
            this.id_lbl.TabIndex = 5;
            this.id_lbl.Text = "ID:";
            // 
            // entry_lbl
            // 
            this.entry_lbl.AutoSize = true;
            this.entry_lbl.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.entry_lbl.Location = new System.Drawing.Point(29, 46);
            this.entry_lbl.Name = "entry_lbl";
            this.entry_lbl.Size = new System.Drawing.Size(465, 37);
            this.entry_lbl.TabIndex = 4;
            this.entry_lbl.Text = "WPROWADŹ ID INKASENTA";
            // 
            // Entry_p
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(547, 272);
            this.Controls.Add(this.inf_id_btn);
            this.Controls.Add(this.ink_id_txt);
            this.Controls.Add(this.id_lbl);
            this.Controls.Add(this.entry_lbl);
            this.Name = "Entry_p";
            this.Text = "Entry_p";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button inf_id_btn;
        private System.Windows.Forms.TextBox ink_id_txt;
        private System.Windows.Forms.Label id_lbl;
        private System.Windows.Forms.Label entry_lbl;
    }
}